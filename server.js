import "dotenv/config";
import cors from "cors";
import express, { json } from "express";

import { router as index } from "./routes/index.js";
import { router as challenge } from "./routes/challenge.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

const db = process.env.MONGO_URI
mongoose.connect(db)

app.use(cors());
app.use(json());

app.use('/', index)
app.use('/play', challenge)
 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});