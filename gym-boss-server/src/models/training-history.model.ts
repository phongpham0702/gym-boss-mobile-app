import { model, Schema, Document } from 'mongoose';

const TrainingHistorySchema: Schema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },

    exercise:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Exercises"
    }
},
{
    timestamps:true
});

export const  TrainingHistoryModel = model<Document>('TrainingHistory',  TrainingHistorySchema);