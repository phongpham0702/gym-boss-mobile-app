/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException } from '@/exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import SuccessResponse from '@/utils/successResponse.util';
import { logger } from '@/utils/logger';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData, req.body.userName);
      
      const {_id, 
        password, 
        __v, 
        ...responseData } = signUpUserData["_doc"]

      SuccessResponse.CREATED({
        message: "Sign up success",
        userData:{
          userId: _id.toString(),
          ...responseData
        }
      }).send(res)
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

  public handleGoogleAuth = async(error: Error,req: Request, res: Response, next: NextFunction ) => {
    if(error) next(error);

    res.status(200).json({message:"hello"})
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
