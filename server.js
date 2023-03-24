import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import passport from "passport";
import session from "express-session";

import { router as index } from "./routes/index.js";
import { router as auth } from "./routes/auth.js";
import { router as challenge } from "./routes/challenge.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

const db = process.env.MONGO_URI
mongoose.connect(db)

app.use(cors());
app.use(json());

app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    saveUninitialized: false,
    resave: false,
    name: "email-auth"
}))

app.use(passport.initialize());
app.use(passport.session());

import "./config/passport.js"

app.use('/', index)
app.use('/auth', auth)
app.use('/play', challenge)
 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});