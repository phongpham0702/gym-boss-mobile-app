import passport from 'passport';
import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/signup", ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post("/login", ValidationMiddleware(LoginDto), this.auth.logIn);
    this.router.get("/login/google", passport.authenticate("google", {scope: ['profile', 'email']}))
    this.router.get("/auth/google/callback", passport.authenticate('google',{failWithError: true}),this.auth.handleGoogleAuth);
    this.router.post("/logout", AuthMiddleware, this.auth.logOut);
  }
}
