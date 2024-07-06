import { model, Schema, Document } from 'mongoose';
import { UserProfile } from '@/interfaces/userprofiles.interface';
const UserProfileSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  
  firstUpdate:{
    type: Boolean,
    default: false
  }

}, 
{
    timestamps: true,
});

export const UserProfileModel = model<UserProfile & Document>('UserProfiles',UserProfileSchema);
