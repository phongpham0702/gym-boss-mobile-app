import { model, Schema, Document } from 'mongoose';
import { Exercise } from '@/interfaces/exercise.interface';
const ExerciseSchema: Schema = new Schema({

    exerciseTitle:{
        type:String,
        required:true
    },

    exerciseTarget:{
        type:{
            targetId: Number,
            name: String,
        },
        required:true
    },

    exerciseDuration:{
        type: Number,
        required:true
    },

    exerciseGoal:{
        type:{
            goalId: Number,
            name: String,
        },
        required:true
    },

    exerciseDifficult:{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    caloriesBurned:{
        type:Number,
        required:true
    },

    requiredEquipment:{
        type: String,
        required:true
    },
    exampleVideo:{
        type: String,
        required:true
    },
}, 
{
    timestamps: true,
});

export const ExerciseModel = model<Exercise & Document>('Exercises',ExerciseSchema);
