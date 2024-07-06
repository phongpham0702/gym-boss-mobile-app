export interface GymAddress{
    _id?: string;
    addressName: string;
    city:{
        code: number,
        name: string,
    };
    district:{
        code: number,
        name: string,
    };
    phoneNumber:string;
    detailAddress:string;
    createdAt?: Date;
    updatedAt?: Date
}