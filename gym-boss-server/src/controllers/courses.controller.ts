import { Request, Response, NextFunction } from 'express';
import { HttpException } from "@/exceptions/HttpException";
import SuccessResponse from '@/utils/successResponse.util';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CourseService } from '@/services/course.service';

export class CourseController{
    public courseService:CourseService= Container.get(CourseService);

    public getCourseList = async(req:Request,res:Response,next:NextFunction) =>{
        try {
            
            const courseList = await this.courseService.CourseList()
            SuccessResponse.OK({
                a:"message"
            }).send(res)

        } catch (error) {
            next(error)
        }
    }

    public bookCourse = async (req:RequestWithUser ,res: Response,next: NextFunction) =>{
        try {
            
            const clientPaymentIntentSecret = await this.courseService.BookCourse(req.body.courseId)
            SuccessResponse.OK({
                clientPaymentIntentSecret
            }).send(res)

        } catch (error) {
            next(error)
        }
    }
}   
