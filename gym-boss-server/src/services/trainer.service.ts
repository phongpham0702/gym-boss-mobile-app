import { HttpException } from "@/exceptions/HttpException";
import { Trainer } from "@/interfaces/trainer.interface";
import { TrainerModel } from "@/models/trainer.model";
import { Service } from "typedi";

@Service()
export class TrainerService{


    public async TrainerList(){

        const trainerList:Array<Trainer> = await TrainerModel.find({},{
            "updatedAt":0,
            "createdAt":0,
            "__v":0,
            "workingArea._id":0,
            "contactInfo._id":0
        }).lean()

        return trainerList;
    }

    public async TrainerDetail(trainerID){
        const trainer:Trainer = await TrainerModel.findOne({
            _id:trainerID
        }).lean()

        return trainer;
    }

}