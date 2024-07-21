export interface Exercise{
    _id: string;
    ownerId:string;
    breakfast:string;
    dinner:string;
    salad:string;
    createdAt?: Date;
    updatedAt?: Date
}