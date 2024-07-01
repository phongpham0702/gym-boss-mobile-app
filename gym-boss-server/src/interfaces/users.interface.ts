export interface User {
  _id?: string;
  email: string;
  password: string;
  userName: string,
  userGender: string,
  userAge: number,
  currentHeight: number,
  currentWeight: number,
  userAvatarURL?: string,
  createdAt?: Date,
  updatedAt?: Date
}
