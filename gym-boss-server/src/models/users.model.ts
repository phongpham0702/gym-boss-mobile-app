/* eslint-disable prettier/prettier */

import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  },

  userName:{
    type:String,
    required:true,
  },

  userGender:{
    type: String,
    required: true,
    enum: ["nam","nữ"]
  },

  userAge:{
    type: Number,
    required: true,
    min: 1,
    max: 100
  },

  currentHeight:{
    type: Number,
    required: true
  },

  currentWeight:{
    type: Number,
    required: true
  },

  userAvatarURL:{
    type: String,
    default: ""
  },

  fitnessGoalId:{
    type: Number,
    required: true
  }

}, 
{
    timestamps: true,
});

export const UserModel = model<User & Document>('User',UserSchema);
