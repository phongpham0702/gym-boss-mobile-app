import { Request, Response, NextFunction } from 'express';
import { HttpException } from "@/exceptions/HttpException";
import SuccessResponse from '@/utils/successResponse.util';
import { Container } from 'typedi';
import { FacilityService } from '@/services/facility.service';

export class FacilityController{
    public facilityService:FacilityService = Container.get(FacilityService);

    public getFacilitiesList = async (req:Request ,res: Response,next: NextFunction) =>{
        try {

            SuccessResponse.OK({
                facilityList: await this.facilityService.getAllFacilities()
            }).send(res);

        } catch (error) {
            next(error);
        }
        
    }

    public searchFacilities = async(req:Request ,res: Response,next: NextFunction) => {
        try {
            
            const {city,district}= req.query as {city?:string, district?:string}
            const cityCode:number = city? parseInt(city):null
            const districtCode:number = district? parseInt(district):null
            if(Number.isNaN(cityCode) || Number.isNaN(district)) throw HttpException.BAD_REQUEST("Invalid location code");
            
            SuccessResponse.OK({
                facilityList: await this.facilityService.searchFacilitiesByLocation(cityCode,districtCode)
            }).send(res);

        } catch (error) {
            next(error);
        }
        
    }
}