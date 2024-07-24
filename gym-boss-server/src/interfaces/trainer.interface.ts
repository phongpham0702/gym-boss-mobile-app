export interface Trainer{
    trainerName: string;
    trainerRole:string;
    trainerExpYear:number;
    contactInfo:{
            phoneNumber:string,
            email: string
    },
    workingArea:{
        code: number,
        name: string,
    }
    averageRating:number;
    ratingCount:number
    trainerOverview:string;
    trainerAvatar:string;
}