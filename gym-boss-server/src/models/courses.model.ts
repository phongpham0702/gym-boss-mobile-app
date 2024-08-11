import { ICourse } from "@/interfaces/courses.interface";
import {model,Schema} from "mongoose";

const CourseSchema:Schema = new Schema({

    courseTitle:{
        type:Schema.Types.String,
        required:true
    },

    courseTrainer:{
        type:Schema.Types.ObjectId,
        ref:"Trainers",
        required:true,
    },

    coursePlace:{
        type:Schema.Types.ObjectId,
        ref:"GymAddresses",
        required:true,
    },

    courseParticipantsNum:{
        type:Schema.Types.Number,
        min:0,
        default:0
    },

    courseWorkoutDay:{
        type:Schema.Types.Number,
        min:1,
        required:true
    },

    courseDetailTimeline:{
        type:Schema.Types.String,
        required:true
    },

    participateFee:{
        type:Schema.Types.Number,
        required:true
    },

    courseStartAt:{
        type:Schema.Types.Date,
        required:true
    },
    
    courseStartAtReadable:{
        type:Schema.Types.String,
        required:true
    },

    courseDescription:{
        type:Schema.Types.String
    }

},
{
    timestamps:true
})

export const CourseModel = model<ICourse & Document>('Courses',CourseSchema)