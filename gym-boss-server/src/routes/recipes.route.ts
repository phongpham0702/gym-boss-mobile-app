import { RecipeController } from "@/controllers/recipes.controllers";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class RecipeRoute implements Routes{
    public path = "/recipes";
    public router = Router();
    public recipeController = new RecipeController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.use(AuthMiddleware);
        this.router.get("/category",this.recipeController.getCategory)
        this.router.get("/suggest",this.recipeController.getSuggestList)
        this.router.get("/:page", this.recipeController.getRecipes);
        this.router.get("/detail/:slug", this.recipeController.getDetail)
         
    }
}