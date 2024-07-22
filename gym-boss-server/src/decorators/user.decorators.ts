/* eslint-disable @typescript-eslint/no-unused-vars */
import fitnessGoals from '@/constants/fitnessGoals.const';
import { ExerciseModel } from '@/models/exercises.model';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const MatchPassword = (property: string, validationOptions ?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MatchPassword',
      target: object.constructor,
      propertyName: property,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments):boolean {
          const confirmPassword : string = args.object["confirmPassword"];
          return value === confirmPassword;
        },
      },
    });
  };
};

const IsInFitnessGoalList  = (property: string, validationOptions?: ValidationOptions)=>{
  return function(object: Object,propertyName: string){
    registerDecorator({
      name: 'IsInFitnessGoalList',
      target:  object.constructor,
      propertyName: property,
      constraints:[property],
      options: validationOptions,
      validator:{
        validate(value: number, args: ValidationArguments):boolean{
          return fitnessGoals.some(goal => goal.id === value);
        }
      }
    })
  }
};

const IsExistExercise = (property: string, validationOptions?: ValidationOptions) => {
  return function(object: Object,propertyName: string){
    registerDecorator({
      name: 'IsExistExercise',
      target:  object.constructor,
      propertyName: property,
      constraints:[property],
      options: validationOptions,
      validator:{
        async validate(value: number, args: ValidationArguments):Promise<boolean>{
          try {
            const findExercise = await ExerciseModel.findOne({
             _id: value
            },{_id:1}).lean()

            if(!findExercise) throw new Error()
            return true;
          } catch (error) {
            return false
          }
        }
      }
    })
  }
}

export { MatchPassword, IsInFitnessGoalList, IsExistExercise};