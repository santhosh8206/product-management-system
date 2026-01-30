import express from "express";
import cors from "cors";               // 1️⃣ import cors
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());                       // 2️⃣ allow all origins
app.use(express.json());

// routes
app.use("/api", productRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
