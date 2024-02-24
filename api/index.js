import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import passport from "passport";
import session from "express-session";

import { router as index } from "../routes/index.js";
import { router as auth } from "../routes/auth.js";
import { router as challenge } from "../routes/challenge.js";
import mongoose from "mongoose";
import MongoDBStore from "connect-mongodb-session";
import { Strategy } from "passport-local";
import morgan from "morgan";

import { User } from "../models/User.js";

const app = express();
const PORT = process.env.PORT || 5000;

const db = process.env.MONGO_URI;
mongoose.connect(db);

const mongoStore = MongoDBStore(session);

const store = new mongoStore({
  collection: "userSessions",
  uri: db,
  expires: 24 * 60 * 60 * 1000,
});

const allowedDomains = [
  "http://localhost:4200",
  "https://decipher-equilibrium.netlify.app",
];

// uncomment once testing is complete
const corsOptions = {
  // origin:
  //   process.env.NODE_ENV === "production"
  //     ? "https://decipher-banjaara.netlify.app"
  //     : "http://localhost:4200",
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    const index = allowedDomains.indexOf(origin);
    if (index === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, allowedDomains[index]);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

console.log("Using cors options: ", corsOptions);

app.use(cors(corsOptions));

// app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use(
  session({
    name: "email-auth",
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store,
    // Because https redirect
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? "decipher-backend.onrender.com"
          : "localhost",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    // only use non-hashed in case passwds are manually given to users else compare hashed passwds with bcrypt
    if (password === user.password) {
      return done(null, user);
    }

    return done(null, false, { message: "Incorrect password" });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use("/", index);
app.use("/auth", auth);
app.use("/play", challenge);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
