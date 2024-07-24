import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { SaveTrainingHistory, UpdateUserDto } from '@dtos/users.dto';
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

    //this.router.get("dailymeal",this.user.dailyMeal)
    /* this.router.post("/first-login") */
    /* this.router.get("/", this.user.getUsers);
    this.router.get("/:id", this.user.getUserById);
    this.router.post("/", ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put("/:id", ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete("/:id", this.user.deleteUser); */
  }
}
