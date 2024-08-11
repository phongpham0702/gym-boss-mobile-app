import { Exercise } from '@/interfaces/exercise.interface';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { TrainingHistoryModel } from '@/models/training-history.model';
import { mealHistoryItemPerPage, trainingHistoryItemPerPage } from '@/config/page.config';
import { ITrainingHistory } from '@/interfaces/training-history.interface';
import { ObjectId } from 'mongoose';
import { MealHistoryModel } from '@/models/meal-history.model';

@Service()
export class UserService {

  public async updateUserProfile(userId:string , updateSet:object) {

    const updateProfile = UserModel.updateOne({
      _id: userId
    },
    updateSet
  );
    return updateProfile;
  }

  public async saveTrainingHistory(userId:string, exerciseId: string){
    const createPraticeHistory = await TrainingHistoryModel.create({
      userId: userId,
      exercise: exerciseId
    })

    return createPraticeHistory;

  }

  public async getTrainingHistory(userId:string, currentPage:number = 1 ,sortDate:any= -1){
    const getUserTrainingHistory = await TrainingHistoryModel.find({
      userId: userId
    },
    {
      _id:0,
      updatedAt:0,
      __v:0
    })
    .sort({createdAt: sortDate})
    .skip((currentPage*trainingHistoryItemPerPage)-trainingHistoryItemPerPage )
    .limit(trainingHistoryItemPerPage)
    .populate({
      path:"exercise",
      select:["-createdAt","-updatedAt","-__v"]
    })
    .lean()

    const totalItem:number = await TrainingHistoryModel.find({userId: userId}).countDocuments()

    return {
      currentPage,
      totalItem,
      itemPerPage:trainingHistoryItemPerPage,
      totalPage: Math.ceil(totalItem/trainingHistoryItemPerPage),
      trainingHistory: getUserTrainingHistory
    }
  }
  
  public async saveMealHistory(userId:string,recipeId:string){
    const createMealHistory = await MealHistoryModel.create({
      userId: userId,
      recipe: recipeId
    })

    return createMealHistory;
  }

  public async getMealHistory(userId:string, currentPage:number = 1 ,sortDate:any= -1){
    const getUserMealHistory = await MealHistoryModel.find({
      userId: userId
    },
    {
      _id:0,
      updatedAt:0,
      __v:0
    })
    .sort({createdAt: sortDate})
    .skip((currentPage*mealHistoryItemPerPage)-mealHistoryItemPerPage )
    .limit(mealHistoryItemPerPage)
    .populate({
      path:"recipe",
      select:["-createdAt","-updatedAt","-__v","-recipeIngredients","-recipeSteps"]
    })
    .lean()

    const totalItem:number = await MealHistoryModel.find({userId: userId}).countDocuments()

    return {
      currentPage,
      totalItem,
      itemPerPage:mealHistoryItemPerPage,
      totalPage: Math.ceil(totalItem/mealHistoryItemPerPage),
      mealHistory: getUserMealHistory
    }
  }

  public async getUserCalBurned(userId:string){
    const userTrainingHistory: Array<ITrainingHistory> = await TrainingHistoryModel.find({
      userId: userId
    })
    .populate({
      path:"exercise",
      select:["exerciseDuration","caloriesBurned"]
    })
    .lean()

    let calBurned:number = 0, trainingDur:number = 0
    
    for(let item of userTrainingHistory){
      let ex:Exercise = item.exercise as Exercise
      calBurned += ex. caloriesBurned;
      trainingDur += ex.exerciseDuration;
    }

    return {
      trainingCount: userTrainingHistory.length,
      caloBurned:calBurned,
      trainingDuration:trainingDur
    }
  }
}
