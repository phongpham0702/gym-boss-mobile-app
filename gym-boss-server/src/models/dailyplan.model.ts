import { model, Schema, Document } from 'mongoose';

const DailyPlanSchema: Schema = new Schema({

    ownerId:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true
    },

    breakfast:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    },

    dinner:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    },

    salad:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    },

    snack:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    },

    upperBodyExercise:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Exercises"
    },

    coreExercise:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Exercises"
    },

    lowerBodyExercise:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Exercises"
    },

    totalBodyExercise:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Exercises"
    }

})

export const dailyPlan = model<Recipe & Document>