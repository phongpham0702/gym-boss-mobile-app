import { FacilityController } from "@/controllers/facility.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class FacilityRoute implements Routes{
    public path = "/facilities";
    public router = Router();
    public facilityController = new FacilityController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.use(AuthMiddleware);
        this.router.get("/", this.facilityController.getFacilitiesList);
        this.router.get("/search",this.facilityController.searchFacilities);
    }
}