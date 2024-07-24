import { TrainerController } from './../controllers/trainer.controller';
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class TrainerRoute implements Routes{
    public path = "/trainers";
    public router = Router();
    public trainerController = new TrainerController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.use(AuthMiddleware);
        this.router.get("/", this.trainerController.getTrainerList);
    }
}