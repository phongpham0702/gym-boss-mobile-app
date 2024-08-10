import { CourseController } from "@/controllers/courses.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { CourseModel } from "@/models/courses.model";
import { createPaymentIntent } from "@/utils/stripe.util";
import { Router } from "express";

export class CourseRoute implements Routes{
    public path = "/courses";
    public router = Router();
    public courseController = new CourseController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.use(AuthMiddleware);
        

        this.router.get("/",this.courseController.getCourseList)

        this.router.post("/test-create-course",(req,res,next) => {
            const ts = req.body.courseStartAt*1000
            const d = new Date(ts).toLocaleString("vi-VN",{
                hour12: false,
                year: 'numeric',
                month: '2-digit',    // Định dạng tháng với 2 chữ số
                day: '2-digit',      // Định dạng ngày với 2 chữ số
                hour: '2-digit',     // Định dạng giờ với 2 chữ số
                minute: '2-digit',   // Định dạng phút với 2 chữ số
              })
            CourseModel.create({
                "courseTitle": req.body.courseTitle,
                "courseTrainer":req.body.courseTrainer, 
                "coursePlace":req.body.coursePlace,
                "courseMaxSlot":req.body.courseMaxSlot,
                "courseDetailTimeline": req.body.courseDetailTimeline,
                "courseWorkoutDay":req.body.courseWorkoutDay,
                "participateFee":req.body.participateFee,
                "courseStartAt":ts,
                "courseStartAtReadable": d,
                "courseDescription":req.body.courseDescription
            })
            console.log(req.body);
            console.log(d);
            res.status(200).json({"message":"add"})
        })
        
        this.router.post("/booking", this.courseController.bookCourse)
    }
}