import { MatchPassword, IsInFitnessGoalList, IsExistExercise } from '@/decorators/user.decorators';
import { IsEmail, IsString, IsInt, IsNotEmpty, MinLength, MaxLength, IsIn, Max, Min, IsMongoId, IsOptional} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;

  @MinLength(6)
  @MaxLength(32)
  @MatchPassword("password",{message: "Confirm password is not match"})
  public confirmPassword: string;

}

export class LoginDto{
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}


export class FirstUpdateProfileDto{
 @IsString()
 @IsNotEmpty()
 public userName: string;

 @IsString()
 @IsIn(['Nam', 'Nữ'])
 public userGender: string;

 @IsInt()
 @Min(1)
 @Max(100)
 public userAge: number;

 @IsInt()
 public currentHeight: number;

 @IsInt()
 public currentWeight: number;

 @IsInt()
 @IsInFitnessGoalList('fitnessGoalId',{message: "Invalid fitness goal"})
 public fitnessGoalId: number;

}

export class SaveTrainingHistory{
  @IsMongoId({message:"Invalid exercise id"})
  @IsExistExercise('exerciseId',{message: "Cannot find this exercise"})
  public exerciseId: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public userName: string;
  
  @IsOptional()
  @IsString()
  @IsIn(['Nam', 'Nữ'])
  public userGender: string;
  
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  public userAge: number;
  
  @IsOptional()
  @IsInt()
  public currentHeight: number;
  
  @IsOptional()
  @IsInt()
  public currentWeight: number;
  
  @IsOptional()
  @IsInt()
  @IsInFitnessGoalList('fitnessGoalId',{message: "Invalid fitness goal"})
  public fitnessGoalId: number;
}
