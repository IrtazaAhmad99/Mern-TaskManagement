const express = require("express");
const cors = require("cors");
const Http = require("http")
const { Server } = require("socket.io");
const connectdb = require("./DB/connectdb")
const ENV = require("./Helper/ENV/environment")


const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const adminRoutes = require("./routes/adminRoutes")
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const server = Http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: "*",
    },
})

app.use((req,res,next)=>{
    req.io=io;
    next()
})

io.on("connection",(socket)=>{
console.log("User Connected Socket Io", socket.id);
socket.on("Disconnected", ()=>{
    console.log("User Disconnected", socket.id)
})
})


app.use("/api/auth", authRoutes);
app.use("/api/task",taskRoutes);
app.use("/api/user",adminRoutes);

connectdb()
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
const PORT = ENV.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});