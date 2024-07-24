import { Request, Response, NextFunction } from 'express';
import { HttpException } from "@/exceptions/HttpException";
import SuccessResponse from '@/utils/successResponse.util';
import { Container } from 'typedi';
import { TrainerService } from '@/services/trainer.service';
export class TrainerController{
    public trainerService:TrainerService= Container.get(TrainerService);

    public getTrainerList = async (req:Request ,res: Response,next: NextFunction) => {
        try {

            SuccessResponse.OK({
                trainerList: await this.trainerService.TrainerList()
            }).send(res);
            
        } 
        catch (error) {
            next(error)    
        }
        
        
    }

}   
