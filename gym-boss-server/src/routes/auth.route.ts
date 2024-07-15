import passport from 'passport';
import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ExerciseModel } from '@/models/exercises.model';
export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/add-recipe",(req,res,next) => {
      console.log(req.body);
      res.status(200).json({message:"add recipe"})
    })
    this.router.post("/signup", ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post("/login", ValidationMiddleware(LoginDto), this.auth.logIn);
    this.router.get("/login/google", passport.authenticate("google", {scope: ['profile', 'email']}))
    this.router.get("/auth/google/callback", this.auth.handleGoogleAuth);
    this.router.post("/logout", AuthMiddleware, this.auth.logOut);
  }
}
