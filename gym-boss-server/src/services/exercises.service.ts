import { Service } from "typedi";
import { ExerciseModel } from "@/models/exercises.model";
import { Exercise } from "@/interfaces/exercise.interface";
import { ExerciseFilter } from "@/interfaces/exerciseFilter.interface";
import { PipelineStage } from "mongoose";
import { exercisesPerPage } from "@/config/page.config";

@Service()
export class ExerciseService{

    public async getExerciseList(currPage:number = 1,filters:ExerciseFilter = {difficulty:null, targetId:null,goalId:null,minDuration:1,maxDuration:100}){
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

        return {
            currPage,
            exercisesPerPage,
            totalExercise,
            totalPage: Math.ceil(totalExercise/exercisesPerPage),
            exerciseList
        };
    }

    public async getExerciseDetail(exerciseID:string):Promise<Exercise>{

        const findExercise:Exercise = await ExerciseModel.findById({
            _id: exerciseID
        },{__v:0,createdAt:0,updatedAt:0, "exerciseTarget._id":0,"exerciseGoal._id":0})
        .lean();

        return findExercise;
    }

    public async getRandomExercise(limit:number=1){

        const pipeline = [
            { $match: { "exerciseTarget.targetId": 1 } }, //Full-body
            { $sample: { size: limit } }, 
            { $unionWith: {
                coll: "exercises",
                pipeline: [
                    { $match: { "exerciseTarget.targetId": 2 } }, //Belly
                    { $sample: { size: limit } }
                ]
            }},
            { $unionWith: {
                coll: "exercises",
                pipeline: [
                    { $match: { "exerciseTarget.targetId": 3 } }, //Upper
                    { $sample: { size: limit } }
                ]
            }},
            { $unionWith: {
                coll: "exercises",
                pipeline: [
                    { $match: { "exerciseTarget.targetId": 4 } }, //Lower
                    { $sample: { size: limit } }
                ]
            }},
            {
                $project:{__v:0,createdAt:0,updatedAt:0}
            }
        ]

        const categorySuggestList:Exercise[] = await ExerciseModel.aggregate(pipeline)
        
        let orderByCategory = {
            fullBody:[],
            core:[],
            upperBody:[],
            lowerBody:[]
        }

        for(let r of categorySuggestList){
            switch (r.exerciseTarget.targetId) {
                case 2:
                    orderByCategory.core.push(r)
                    break;
                case 3:
                    orderByCategory.upperBody.push(r)
                    break;
                case 4:
                    orderByCategory.lowerBody.push(r)
                    break;
                default:
                    orderByCategory.fullBody.push(r)
                    break;
            }
        }

        return {...orderByCategory};

    }

}