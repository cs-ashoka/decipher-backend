import "dotenv/config";
import cors from "cors";
import express, { json } from "express";

import { router as index } from "./routes/index.js";
import { router as home } from "./routes/home.js";
import { router as play } from "./routes/play.js";
import { router as room } from "./routes/room.js";
import { router as challenge } from "./routes/challenge.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

const db = process.env.MONGO_URI
mongoose.connect(db)

app.use(cors());
app.use(json());

app.use('/', index)
app.use('/home', home)
app.use('/play', play)
app.use('/play', room)
app.use('/play', challenge)
 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});