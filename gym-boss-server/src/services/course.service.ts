import { PipelineStage, Types } from 'mongoose';
import { ICourse } from '@/interfaces/courses.interface';
import { HttpException } from "@/exceptions/HttpException";
import { CourseModel } from "@/models/courses.model";
import { Service } from "typedi";
import { createPaymentIntent } from '@/utils/stripe.util';
import { coursePerPage } from '@/config/page.config';

@Service()
export class CourseService{

    public async CourseList(currentPage:number = 1, options:{
                sortBy?:string,
                addressId?:string
            } = {}
        ){
            let filter:Object = {}
            let orderBy:Record<string,1|-1> = {}
            
            if(options.addressId) filter["coursePlace"] = new Types.ObjectId(options.addressId);

            switch (options.sortBy) {
                case "date":
                    orderBy["courseStartAt"]= 1
                    break;
                case"date-desc":
                    orderBy["courseStartAt"]= -1
                    break;
                case "price":
                    orderBy["participateFee"]= 1
                    break;
                case "price-desc":
                    orderBy["participateFee"]= -1
                    break;
                default:
                    orderBy["participateFee"]= -1
                    break;
            }

            
            const courseList = await CourseModel.find(filter,{createdAt:0,updatedAt:0,__v:0})
            .sort(orderBy)
            .skip((currentPage*coursePerPage)-coursePerPage)
            .limit(coursePerPage)
            .populate({
                path:"courseTrainer",
                select:"trainerName trainerAvatar"
            })
            .populate({
                path:"coursePlace",
                select:"addressName"
            })
            .lean()
            console.log(courseList);
        /* const courseList = await CourseModel.aggregate([
            ...filterPipeLine,
            {$skip:(currentPage*coursePerPage)-coursePerPage}
        ])
        console.log(courseList); */
        /* const getUserMealHistory = await MealHistoryModel.find({
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
        } */
       return ""
      }

    public async BookCourse(courseId:string){
        const findCourse:ICourse = await CourseModel.findOne({
            _id: courseId
        })
        .select(["participateFee","courseStartAt"])
        .lean()
        
        const current:Date = new Date(Date.now())
        
        if(current >= findCourse.courseStartAt){
            throw HttpException.NOT_ACCEPTABLE("Khóa huấn luyện đã hết hạn đăng ký")
        }

        const paymentIntentSecret:String = await createPaymentIntent(findCourse.participateFee)
     
        return paymentIntentSecret;
    }
}