import express from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkoutByID,
  getWorkoutByName,
  getAllWorkouts,
  updateWorkout,
} from "../controllers/workoutController";
import validateUser from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", validateUser, createWorkout);

router.get("/", validateUser, getAllWorkouts);
router.put("/:id", validateUser, updateWorkout);
router.delete("/:id", validateUser, deleteWorkout);
router.get("/:id", validateUser, getWorkoutByID);
router.get("/byName/:Name", validateUser, getWorkoutByName);

export default router;
