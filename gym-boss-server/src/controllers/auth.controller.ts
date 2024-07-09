/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException } from '@/exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import SuccessResponse from '@/utils/successResponse.util';
import passport from 'passport';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);
      
      if(signUpUserData){
        SuccessResponse.CREATED({
            message: "Sign up success",   
        }).send(res)
      }
      else{
        throw HttpException.SERVER_ERROR();
      }
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const loginData = await this.auth.login(userData);
      SuccessResponse.OK(loginData).send(res);
    } catch (error) {
      next(error);
    }
  };

  public handleGoogleAuth = async(req: Request, res: Response, next: NextFunction ) => {
    passport.authenticate('google',{
        failWithError:true
      },
      (err, data) => {
      if (err || req.query.error) {
        next(HttpException.AUTH_ERROR());
      }
      else{
        return SuccessResponse.OK({
            ...data
        }).send(res);
      }
    })(req,res,next)
}

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
