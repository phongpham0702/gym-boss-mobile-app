import { model, Schema, Document } from 'mongoose';
import { GymAddress } from '@interfaces/gym_address.interface';
const GymAddressSchema: Schema = new Schema({

  addressName:{
    type: String,
  },

  city:{
    type: {
      code: Number,
      name: String,
    },
  },

  district:{
    type: {
      code: Number,
      name: String,
    },
  },

  phoneNumber:{
    type: String
  },

  detailAddress:{
    type: String,
  },

}, 
{
    timestamps: true,
});

export const GymAddressModel = model<GymAddress & Document>('GymAddresses',GymAddressSchema);
