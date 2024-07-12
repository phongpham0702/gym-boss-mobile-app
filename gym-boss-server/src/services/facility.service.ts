import { HttpException } from "@/exceptions/HttpException";
import { GymAddress } from "@/interfaces/gym_address.interface";
import { GymAddressModel } from "@/models/gym_address.model";
import { Service } from "typedi";

@Service()
export class FacilityService{
    public async getAllFacilities(){

        const facilityList:Array<GymAddress> = await GymAddressModel.find({},{
            __v:0,
            createdAt:0,
            updatedAt:0,
            "city._id":0,
            "district._id":0,

        }).lean();

        return facilityList;
    }

    public async searchFacilitiesByLocation(cityCode?:number, districtCode?:number){

        if(!cityCode) throw HttpException.BAD_REQUEST("Missing city code")
        const filter = {
            "city.code": cityCode,
        }
        
        if(districtCode) filter["district.code"] = districtCode

        const facilityList:Array<GymAddress> = await GymAddressModel.find(filter,{
            __v:0,
            createdAt:0,
            updatedAt:0,
            "city._id":0,
            "district._id":0,

        }).lean();

        return facilityList

    }
}