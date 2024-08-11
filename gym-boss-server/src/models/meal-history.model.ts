import { IMealHistory } from '@/interfaces/meal-history.interface';
import { model, Schema, Document } from 'mongoose';

const MealHistorySchema: Schema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },

    recipe:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    }
},
{
    timestamps:true
});

export const  MealHistoryModel = model<IMealHistory & Document>('MealHistory',  MealHistorySchema);