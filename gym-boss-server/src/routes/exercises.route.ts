import { Router } from "express";
import { Routes } from "@/interfaces/routes.interface";
import { ExerciseController } from "@/controllers/exercises.controller";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
export class ExerciseRoute implements Routes{
    public path = "/exercises";
    public router = Router();
    public exerciseController = new ExerciseController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.use(AuthMiddleware);
        this.router.get("/:page",this.exerciseController.getExerciseList)
    }
}