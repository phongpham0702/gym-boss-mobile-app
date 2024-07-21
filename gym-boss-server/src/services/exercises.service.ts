import { Service } from "typedi";
import { ExerciseModel } from "@/models/exercises.model";
import { Exercise } from "@/interfaces/exercise.interface";
import { ExerciseFilter } from "@/interfaces/exerciseFilter.interface";
import { PipelineStage } from "mongoose";

@Service()
export class ExerciseService{

    public async getExerciseList(currPage:number = 1,filters:ExerciseFilter = {difficulty:null, targetId:null,goalId:null,minDuration:1,maxDuration:100}){
        const exercisesPerPage:number = 10;
        const matchCondition = {}

        if(filters.targetId.length > 0) matchCondition["exerciseTarget.targetId"] = {$in:filters.targetId}
        if(filters.difficulty.length > 0) matchCondition["exerciseDifficult"] = {$in:filters.difficulty}
        if(filters.goalId.length > 0) matchCondition["exerciseGoal.goalId"] = {$in:filters.goalId}
        if(filters.minDuration > 0) matchCondition["exerciseDuration"] = {$gt:filters.minDuration}
        if(filters.maxDuration > 0) matchCondition["exerciseDuration"] = {$lte:filters.maxDuration}

        const pipeLine:PipelineStage[] =[
            {$match:{
                ...matchCondition
            }},
            {$skip: (exercisesPerPage * currPage) - exercisesPerPage},
            {$limit: exercisesPerPage},
            {
                $project:{
                    "exerciseTarget._id":0,
                    "exerciseGoal._id":0,
                    "createdAt":0,
                    "updatedAt":0,
                    "__v":0
                }
            }
        ]
        const exerciseList:Array<Exercise> = await ExerciseModel.aggregate(pipeLine);
        const totalExercise:number = await ExerciseModel.countDocuments({
            ...matchCondition
        })
        console.log(totalExercise);
        return {
            currPage,
            exercisesPerPage,
            totalPage: Math.ceil(totalExercise/exercisesPerPage),
            exerciseList
        };
    }

}