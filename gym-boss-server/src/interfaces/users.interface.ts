export interface User {
  _id?: string;
  email?: string;
  password?: string;
  userName?: string,
  userGender?: string;
  userAge?: number;
  currentHeight?: number;
  currentWeight?: number;
  userAvatarURL?: string;
  fitnessGoalId?: number;
  isUpdatedProfile?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
