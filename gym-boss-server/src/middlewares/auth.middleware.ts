import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { findUserById } from '@/models/repo/users.repo';
import { User } from '@/interfaces/users.interface';

const getAuthorization = (req: Request) => {
  const header = req.header('Authorization');

  if (header) return header.split('Bearer ')[1];

  return null;
}

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { userId } = (await verify(Authorization, ACCESS_TOKEN_SECRET_KEY)) as DataStoredInToken;
      const findUser:User = await findUserById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      }
      else
      {
        throw Error();
      }   
    }
    else {
      next(HttpException.BAD_REQUEST('Authentication token missing'));
    }
  } catch (error) {
    next(HttpException.AUTH_ERROR('Invalid authentication token'));
  }
};

export const isValidProfile = async(req: RequestWithUser, res: Response, next: NextFunction) => {
  if(req.user.isUpdatedProfile){
    next();
  }else{
    next(HttpException.BAD_REQUEST('Please update your profile'))
  }
}
