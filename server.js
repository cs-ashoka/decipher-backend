import "dotenv/config";
import cors from "cors";
import express, { json } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send("Decipher")
})
 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});