import { HttpException } from './../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import SuccessResponse from '@/utils/successResponse.util';
import { RequestWithUser } from '@/interfaces/auth.interface';
import fitnessGoals from '@/constants/fitnessGoals.const';
import { UpdateUserDto } from '@/dtos/users.dto';

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

  public updateProfile = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try 
    { 

      const updateSet = {
        userName: req.body.userName,
        userGender: req.body.userGender,
        userAge:req.body.userAge,
        currentHeight:req.body.currentHeight,
        currentWeight: req.body.currentWeight,
        fitnessGoal: req.body.fitnessGoals,
      }
      
      const updatedResult = await this.userService.updateUserProfile(req.user._id,updateSet);

      SuccessResponse.CREATED({
        message: "Updated profile successfully"
      }).send(res)

    } 
    catch (error) {
      next(error)  
    }
  }

  public completeExercise = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try 
    { 
      if(!req.body.exerciseId) throw HttpException.BAD_REQUEST("Missing exercise ID!")

      await this.userService.saveTrainingHistory(req.user._id,req.body.exerciseId);

      SuccessResponse.CREATED({
        message: "Add to training history successfully"
      }).send(res)

    } 
    catch (error) {
      next(error)  
    }
  }

  public getTrainingHistory = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const pageNum:number = parseInt(req.params.page)
      if(Number.isNaN(pageNum)) throw HttpException.BAD_REQUEST("Invalid page number")
      
      let sortDate:number = parseInt(req.query.sort.toString());
      
      if(Number.isNaN(sortDate)) sortDate = -1

      const trainingHistory = await this.userService.getTrainingHistory(req.user._id, pageNum,sortDate)
      
        SuccessResponse.OK({
          ...trainingHistory
        }).send(res)
    }   
    catch (error) {
      next(error)  
    }


  }

  public dailyMeal = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      SuccessResponse.CREATED({
        message: "Add to training history successfully"
      }).send(res)

    } 
    catch (error) {
      next(error)  
    }
  }

}
