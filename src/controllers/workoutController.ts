import express, { Request, Response } from "express";
import { Workout } from "../models/Workout";
import { Exercise } from "../models/Exercise";

export const createWorkout = async (req: Request, res: Response) => {
  const { name, exercises, scheduleDay, completed, comments } = req.body;
  if (!name || !exercises || !scheduleDay) {
    throw new Error("Please provide all fields");
  }
  try {
    const workout = await Workout.create({
      userId: req.body.userId,
      name,
      exercises,
      scheduleDay,
      completed,
      comments,
    });
    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      data: workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create workout",
      error: (error as Error).message,
    });
  }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      throw new Error("Please provide a userId");
    }

    const allWorkouts = await Workout.find({ userId }).populate("exercises");
    if (allWorkouts.length === 0) {
      throw new Error("No workouts found for this user. Please create one");
    }

    res.status(200).json({
      success: true,
      message: "Your Workouts are here: ",
      data: allWorkouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get workouts",
      error: (error as Error).message,
    });
  }
};

export const getWorkoutByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("Please provide a userId");
    }

    const workouts = await Workout.findById(id).populate("exercises");

    res.status(200).json({
      success: true,
      message: "Your Workout of the following workout id is here: ",
      data: workouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get workouts",
      error: (error as Error).message,
    });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { name, exercises, scheduleDay, completed, comments } = req.body;

  try {
    const findWorkout = await Workout.findById(id, { userId });
    if (!findWorkout) {
      throw new Error("Workout not found");
    }
    const updateWorkout = await Workout.findByIdAndUpdate(id, {
      name,
      exercises,
      scheduleDay,
      completed,
      comments,
    });
    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      data: updateWorkout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update workout",
      error: (error as Error).message,
    });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Please provide a workout id");
  }

  try {
    const updateWorkout = await Workout.findByIdAndDelete(id).populate(
      "exercises"
    );
    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
      data: updateWorkout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete workout",
      error: (error as Error).message,
    });
  }
};

export const getWorkoutByName = async (req: Request, res: Response) => {
  const { Name } = req.params;
  const userID = req.body.userId;
  try {
    if (!Name) {
      throw new Error("Please provide a the workout plan name");
    }

    const workouts = await Workout.find({
      name: Name,
      userId: userID,
    }).populate("exercises");

    if (!workouts || workouts.length === 0) {
      throw new Error(`No workout found with this name : ${Name}`);
    }

    res.status(200).json({
      success: true,
      message: "Your Workout plan of the following workout name is here: ",
      data: workouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get workout plan",
      error: (error as Error).message,
    });
  }
};

// export const createWorkoutDirect = async (req: Request, res: Response) => {
//   const { name, exercises, scheduleDay, completed, comments } = req.body;
//   const { userID } = req.body.userId;

//   try {
//     if (!name || !exercises || !scheduleDay || completed === undefined) {
//       throw new Error("Please provide all fields");
//     }

//     // Create exercises and associate userId
//     const createdExercises = [];
//     for (let exerciseData of exercises) {
//       const { name, description, reps, sets } = exerciseData;
//       if (!name || !reps || !sets) {
//         throw new Error("Please provide all fields for each exercise");
//       }

//       // Create exercise with userId
//       const exercise = await Exercise.create({
//         userId: userID,
//         name,
//         description,
//         reps,
//         sets,
//       });

//       createdExercises.push(exercise._id); // Store the exercise _id to reference in the workout
//     }

//     // Create the workout
//     const workout = await Workout.create({
//       userId: userID, // Reference the userId
//       name,
//       exercises: createdExercises, // Assign created exercise ids to the workout
//       scheduleDay,
//       completed,
//       comments,
//     });
//     res.status(201).json({
//       success: true,
//       message: "Workout created successfully",
//       data: workout,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Unable to create workout",
//       error: (error as Error).message,
//     });
//   }
// };
