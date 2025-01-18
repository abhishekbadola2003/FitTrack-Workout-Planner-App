import { Request, Response } from "express";
import { Exercise } from "../models/Exercise";

export const createExercise = async (req: Request, res: Response) => {
  const { name, description, reps, sets } = req.body;
  const userId = req.body.userId;
  try {
    if (!name || !reps || !sets) {
      throw new Error("Please provide all fields");
    }

    const exercise = await Exercise.create({
      userId,
      name,
      description,
      reps,
      sets,
    });

    res.status(201).json({
      success: true,
      message: "Exercise created successfully",
      data: exercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create exercise",
      error: (error as Error).message,
    });
  }
};

export const getExercises = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    if (!userId) {
      throw new Error("Please provide an id");
    }
    const getExercise = await Exercise.find({ userId });
    if (!getExercise || getExercise.length === 0) {
      throw new Error("No exercises found for this user. Please create one");
    }
    res.status(201).json({
      success: true,
      message: "These are the exercises for your workout",
      data: getExercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get exercises",
      error: (error as Error).message,
    });
  }
};
export const getExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;
  try {
    if (!id) {
      throw new Error("Please provide id");
    }

    const exerciseById = await Exercise.findOne({ _id: id, userId });
    if (!exerciseById) {
      throw new Error("Exercise not found");
    }
    res.status(201).json({
      success: true,
      message: "Exercise by ID fetched successfully",
      data: exerciseById,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to find exercise",
      error: (error as Error).message,
    });
  }
};
export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    if (!id) {
      throw new Error("Please provide id");
    }

    const deleteExercise = await Exercise.findByIdAndDelete(id, { userId });

    if (!deleteExercise) {
      throw new Error("Exercise not found");
    }

    res.status(201).json({
      success: true,
      message: "Exercise deleted successfully",
      data: deleteExercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete exercise",
      error: (error as Error).message,
    });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, reps, sets } = req.body;
  const userId = req.body.userId;

  try {
    const findExercise = await Exercise.findById(id, { userId });
    if (!findExercise) {
      throw new Error("Exercise not found");
    }
    const updateExercise = await Exercise.findByIdAndUpdate(id, {
      name,
      description,
      reps,
      sets,
    });

    res.status(201).json({
      success: true,
      message: "Exercise updated successfully",
      data: updateExercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create exercise",
      error: (error as Error).message,
    });
  }
};

export const getExerciseByName = async (req: Request, res: Response) => {
  const { Name } = req.params;
  const userID = req.body.userId;
  try {
    if (!Name) {
      throw new Error("Please provide a the workout plan name");
    }

    const nameExercise = await Exercise.find({ name: Name, userId: userID });

    if (!nameExercise || nameExercise.length === 0) {
      throw new Error(`No workout found with this name : ${Name}`);
    }

    res.status(200).json({
      success: true,
      message: "Your Workout plan of the following workout name is here: ",
      data: nameExercise,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get workout plan",
      error: (error as Error).message,
    });
  }
};
