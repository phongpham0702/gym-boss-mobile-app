export interface Exercise{
    _id?: string;
    exerciseTitle:string;
    exerciseGoal:number;
    exerciseDuration:number;
    exerciseDifficult:number;
    caloriesBurned: number;
    requiredEquipment:string;
    exampleVideo:string;
    createdAt?: Date;
    updatedAt?: Date
}