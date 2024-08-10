import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { SaveMealHistory, SaveTrainingHistory, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware, isValidProfile } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public user = new UserController();

  constructor() {
    
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(AuthMiddleware)
    this.router.route("/first-login")
    .get(this.user.getFirstLoginData)
    .put(ValidationMiddleware(UpdateUserDto), this.user.firstLoginUpdate)
    
    this.router.use(isValidProfile)
    this.router.route("/profile")
    .get(this.user.getUserProfile)
    .patch(ValidationMiddleware(UpdateUserDto),this.user.updateProfile)

    this.router.get("/profile/training-history/:page",this.user.getTrainingHistory)
    this.router.post("/exercise-complete",ValidationMiddleware(SaveTrainingHistory),this.user.completeExercise)
    this.router.post("/meal-complete",ValidationMiddleware(SaveMealHistory),this.user.completeMeal)
    this.router.get("/profile/meal-history/:page",this.user.getMealHistory)
    //this.router.get("dailymeal",this.user.dailyMeal)
  }
}
