import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

// console.log("MONGO_URI:", process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("Server is running on port: 3000✅");
});
connectDB();
