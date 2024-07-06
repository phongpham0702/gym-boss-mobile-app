import { MatchPassword, IsInFitnessGoalList } from '@/decorators/user.decorators';
import { IsEmail, IsString, IsInt, IsNotEmpty, MinLength, MaxLength, IsIn, Max, Min} from 'class-validator';

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


export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}


// @IsString()
// @IsNotEmpty()
// public userName: string;


// @IsString()
// @IsIn(['Nam', 'Nữ'])
// public userGender: string;

// @IsInt()
// @Min(1)
// @Max(100)
// public userAge: number;

// @IsInt()
// public currentHeight: number;

// @IsInt()
// public currentWeight: number;

// @IsInt()
// @IsInFitnessGoalList('fitnessGoalId',{message: "Invalid fitness goal"})
// public fitnessGoalId: number;