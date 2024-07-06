/* eslint-disable @typescript-eslint/no-unused-vars */
import fitnessGoals from '@/constants/fitnessGoals.const';
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

export { MatchPassword, IsInFitnessGoalList};