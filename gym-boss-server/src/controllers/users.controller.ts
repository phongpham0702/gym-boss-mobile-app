import { HttpException } from './../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import SuccessResponse from '@/utils/successResponse.util';
import { RequestWithUser } from '@/interfaces/auth.interface';
import fitnessGoals from '@/constants/fitnessGoals.const';

export class UserController {
  public userService = Container.get(UserService);

  public getUserProfile = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const {
        password,
        createdAt,
        updatedAt,
        __v,
        isUpdatedProfile,
        _id,
        fitnessGoalId,
        ...data
      } = req.user

      SuccessResponse.OK({
        userId: _id,
        ...data,
        fitnessGoal: fitnessGoals.find((v) =>{return v.id === fitnessGoalId})
      }).send(res)

    } catch (error) {
      next(error);
    }
  }

  public getFirstLoginData = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if(req.user.isUpdatedProfile){
        throw HttpException.BAD_REQUEST();
      }
      const {userName, fitnessGoalId} = req.user;
      SuccessResponse.OK({
        userName: userName? userName:null,
        userGender: null,
        userAge: null,
        currentHeight: null,
        currentWeight: null,
        fitnessGoal: fitnessGoals.find((v) =>{return v.id === fitnessGoalId})
      }).send(res)

    } catch (error) {
      next(error);
    }


  }

  public firstLoginUpdate = async(req: RequestWithUser, res: Response, next: NextFunction) =>{
    try {
      if(req.user.isUpdatedProfile) throw HttpException.BAD_REQUEST("No permisson!");
      const updateSet = {
        userName: req.body.userName,
        userGender: req.body.userGender,
        userAge:req.body.userAge,
        currentHeight:req.body.currentHeight,
        currentWeight: req.body.currentWeight,
        fitnessGoal: req.body.fitnessGoals,
        isUpdatedProfile:true
      }
      
      const updatedResult = await this.userService.updateUserProfile(req.user._id,updateSet);
      if(updatedResult.modifiedCount > 0){

          SuccessResponse.OK({
          message:"Profile updated successfully"
        }).send(res)

      }
      else{
        throw HttpException.SERVER_ERROR();
      }

      
    } catch (error) {
      next(error);
    }
  }


/*   public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }; */
}
