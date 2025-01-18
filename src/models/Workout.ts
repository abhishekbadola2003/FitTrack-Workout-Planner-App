import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    enum: ["Push", "Pull", "Legs"],
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  ],
  scheduleDay: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: String,
    required: false,
  },
});

export const Workout = mongoose.model("Workout", workoutSchema);
