const express=require("express");
const cors=require("cors");

const authRoutes=require("./routes/authRoutes");
const gameRoutes=require("./routes/gameRoutes");
const contactRoutes=require("./routes/contact")
const app=express();

app.use(cors({
    origin: ["http://localhost:5173",
    "https://smart-guess.vercel.app"],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/games",gameRoutes);
app.use("/api/contact",contactRoutes);

module.exports=app;