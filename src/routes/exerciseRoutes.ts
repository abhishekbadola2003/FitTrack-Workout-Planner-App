import express from "express";
import validateUser from "../middleware/authMiddleware";
import {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getExerciseByName,
} from "../controllers/exerciseController";

const router = express.Router();

router.post("/", validateUser, createExercise);
router.get("/", validateUser, getExercises);
router.get("/:id", validateUser, getExerciseById);
router.put("/:id", validateUser, updateExercise);
router.delete("/:id", validateUser, deleteExercise);
router.get("/byName/:Name", validateUser, getExerciseByName);

export default router;
