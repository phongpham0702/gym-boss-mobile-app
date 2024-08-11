import Container from "typedi";
import { Request,Response,NextFunction } from "express";
import SuccessResponse from "@/utils/successResponse.util";
import { HttpException } from "@/exceptions/HttpException";
import { ExerciseService } from "@/services/exercises.service";

export class ExerciseController {

    private exerciseService:ExerciseService = Container.get(ExerciseService)

    public getExerciseList = async(req:Request,res:Response,next:NextFunction) => {

        try {
            const pageNum = parseInt(req.params.page);
            if(!req.params.page || Number.isNaN(pageNum)) throw HttpException.BAD_REQUEST("Invalid page number");
            
            const {difficulty,target,goal,minDuration,maxDuration} = req.query as {
                difficulty: string | Array<string>,
                target: string | Array<string>,
                goal: string | Array<string>,
                minDuration: string,
                maxDuration: string,
            };

            let difficultyArrayNum:Array<number>;
            if (typeof(difficulty) === "string") {
                difficultyArrayNum = [parseInt(difficulty)];
            } else if (Array.isArray(difficulty)) {
                difficultyArrayNum = difficulty.map(d => parseInt(d));
            } else {
                difficultyArrayNum = [];
            }
            
            let targetArrayNum:Array<number>;
            if (typeof(target) === "string") {
                targetArrayNum = [parseInt(target)];
            } else if (Array.isArray(target)) {
                targetArrayNum = target.map(t => parseInt(t));
            } else {
                targetArrayNum = [];
            }
            
            let goalArrayNum:Array<number>;
            if (typeof(goal) === "string") {
                goalArrayNum = [parseInt(goal)];
            } else if (Array.isArray(goal)) {
                goalArrayNum = goal.map(g => parseInt(g));
            } else {
                goalArrayNum = [];
            }

            const minDurationNum:number = minDuration ? parseInt(minDuration) : null;
            const maxDurationNum:number = maxDuration ? parseInt(maxDuration) : null;

            if(minDuration >= maxDuration) throw HttpException.BAD_REQUEST("Invalid duration filter");

            const getExerciseData = await this.exerciseService.getExerciseList(pageNum,{
                difficulty: difficultyArrayNum,
                targetId: targetArrayNum,
                goalId: goalArrayNum,
                minDuration: minDurationNum,
                maxDuration: maxDurationNum
            });

            SuccessResponse.OK({...getExerciseData}).send(res);
        } catch (error) {
            next(error)
        }

    }

    public getExerciseDetail = async(req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.params.id) throw HttpException.BAD_REQUEST("Missing ID");

            const exerciseDetail = await this.exerciseService.getExerciseDetail(req.params.id)

            if(!exerciseDetail) {
                throw HttpException.BAD_REQUEST("Cannot find this exercise ID")
            }
            else{
                SuccessResponse.OK({
                    exerciseDetail
                }).send(res)
            }
        
        } catch (error) {
            next(error)
        }
    }

    public getSuggestExercise = async(req:Request,res:Response,next:NextFunction) => {
        try {
            
            SuccessResponse.OK({
                categorySuggestList: await this.exerciseService.getRandomExercise()
            }).send(res)

        } catch (error) {
            next(error)
        }
    }
}