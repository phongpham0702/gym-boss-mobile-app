import { Schema } from "mongoose";
import { Exercise } from "./exercise.interface";

export interface ITrainingHistory{
    userId: Schema.Types.ObjectId,
    exercise: Exercise | Schema.Types.ObjectId
}