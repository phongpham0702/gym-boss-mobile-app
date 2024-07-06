export interface UserProfile {
    _id?: string;
    email?:string;
    userName?: string,
    userGender?: string;
    userAge?: number;
    currentHeight?: number;
    currentWeight?: number;
    userAvatarURL?: string;
    fitnessGoalId?: number;
    firstUpdate?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  