/* eslint-disable prettier/prettier */

import { model, Schema } from 'mongoose';

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
    enum: ["male","female"]
  },

  birthDay:{
    type: Schema.Types.Date,
    required: true,
  },

  currentHeight:{
    type: Number,
  },

  currentWeight:{
    type: Number
  }

}, 
{
    timestamps: true,
});

