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
    default: ""
  },

  userGender:{
    type: String,
    enum: ["Nam","Nữ", ""],
    default: ""
  },

  userAge:{
    type: Number,
    min: 1,
    max: 100,
    default: 1
  },

  currentHeight:{
    type: Number,
    default: 0
  },

  currentWeight:{
    type: Number,
    default: 0
  },

  userAvatarURL:{
    type: String,
    default: ""
  },

  fitnessGoalId:{
    type: Number,
    default: 1
  },

  isUpdatedProfile:{
    type: Boolean,
    default: false
  }

}, 
{
    timestamps: true,
});

export const UserModel = model<User & Document>('User',UserSchema);
