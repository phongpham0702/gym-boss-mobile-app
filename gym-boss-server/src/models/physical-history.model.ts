import { model, Schema, Document } from 'mongoose';

const PhysicalHistorySchema: Schema = new Schema({

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

export const  PhysicalHistoryModel = model<Document>('PhysicalHistory',  PhysicalHistorySchema);