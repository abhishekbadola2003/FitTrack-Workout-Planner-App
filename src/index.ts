import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(400).send("Invalid route");
});

(async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to MongoDB");
  }
})();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
