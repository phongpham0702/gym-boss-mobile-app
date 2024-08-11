import { Schema } from "mongoose";
import { Trainer } from "./trainer.interface";
import { GymAddress } from "./gym_address.interface";

export interface ICourse{
    _id?: string;
    courseTitle:string;
    courseTrainer: Trainer | Schema.Types.ObjectId;
    coursePlace: GymAddress | Schema.Types.ObjectId;
    courseParticipantsNum?:number;
    courseWorkoutDay:number;
    courseDetailTimeline: string;
    participateFee: number;
    courseStartAt: Date;
    courseStartAtReadable:string;
    courseDescription?: string;
    createdAt?: Date;
    updatedAt?: Date;
}