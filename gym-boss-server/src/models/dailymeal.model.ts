import { model, Schema, Document } from 'mongoose';

const DailyMealSchema: Schema = new Schema({

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
})

export const dailyMealModel = model<Document>('DailyMeals',DailyMealSchema);