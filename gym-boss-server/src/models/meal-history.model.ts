import { ITrainingHistory } from '@/interfaces/training-history.interface';
import { model, Schema, Document } from 'mongoose';

const MealHistorySchema: Schema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },

    meal:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Recipes"
    }
},
{
    timestamps:true
});

export const  MealHistoryModel = model<ITrainingHistory & Document>('MealHistory',  MealHistorySchema);