import { Trainer } from '@/interfaces/trainer.interface';
import { model, Schema, Document } from 'mongoose';

const TrainerSchema: Schema = new Schema({

    trainerName:{
        type:Schema.Types.String,
        required:true,
    },

    trainerRole:{
        type:Schema.Types.String,
        required:true,
    },

    trainerExpYear:{
        type:Schema.Types.Number,
        required:true,
        min:0
    },

    contactInfo:{
        type:{
            phoneNumber:Schema.Types.String,
            email: Schema.Types.String
        }
    },

    workingArea:{
        type:{
            code: Number,
            name: String,
        },
        required:true
    },

    averageRating: { type: Schema.Types.Number, default: null },
    ratingCount: { type: Schema.Types.Number, default: 0 },

    trainerAvatar:{
        type:Schema.Types.String,
        required:true,
    },

    trainerOverview:{
        type:Schema.Types.String,
        required:true,
    },
    
    
},
{
    timestamps:true
})

export const TrainerModel = model<Trainer&Document>('Trainers',TrainerSchema);