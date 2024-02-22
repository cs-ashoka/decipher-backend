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

// uncomment once testing is complete

app.use(
  cors({
    origin:
      process.NODE_ENV === "production"
        ? "https://decipher-banjaara.netlify.app"
        : "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// app.use(cors());
app.use(json());

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
      sameSite: "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? "decipher.berlm.me"
          : "localhost",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import "../config/passport.js";

app.use("/", index);
app.use("/auth", auth);
app.use("/play", challenge);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
