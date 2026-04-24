const express = require("express");
const cors = require("cors");
const connectdb = require("./DB/connectdb")
const ENV = require("./Helper/ENV/environment")
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task",taskRoutes)

connectdb()
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});