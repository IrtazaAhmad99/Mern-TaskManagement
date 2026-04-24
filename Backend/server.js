const express = require("express");
const cors = require("cors");
const connectdb = require("./DB/connectdb")
const dotenv=require("dotenv")


const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()

connectdb()
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});