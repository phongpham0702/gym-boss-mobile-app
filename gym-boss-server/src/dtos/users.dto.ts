import { MatchPassword } from '@/decorators/user.decorators';
import { IsEmail, 
  IsString, 
  IsInt,
  IsNotEmpty, 
  MinLength, 
  MaxLength,
  IsIn, 
  Max,
  Min,
  Equals} from 'class-validator';





export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;


  @MatchPassword("password")
  public confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  public userName: string;

  @IsString()
  @IsIn(["nam",'nữ'])
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
  public fitnessGoalId : number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}