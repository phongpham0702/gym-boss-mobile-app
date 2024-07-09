import { hash, compare } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { SaltRound} from '@/config/auth.config';
import { createAccessToken, createRefreshToken } from '@/utils/token.util.';
import { DataStoredInToken } from '@/interfaces/auth.interface';

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
  
    if (findUser) throw HttpException.BAD_REQUEST(`This email ${userData.email} already exists`);

    const hashedPassword: string = await hash(userData.password, SaltRound);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }
  
  public async googleAuthLogin(userEmail:string){

    const findUser: User = await UserModel.findOne({ email: userEmail },{__v:0 , createdAt: 0 , updatedAt:0}).lean();
    if (!findUser) throw HttpException.SERVER_ERROR();

    const tokenDataPack: DataStoredInToken = {
      userId: findUser._id,
      userEmail: findUser.email, 
      isUpdateProfile: findUser.isUpdatedProfile
    }

    const accessToken:string = createAccessToken(tokenDataPack);
    const refreshToken:string = createRefreshToken(tokenDataPack);
    return{
      accessToken,
      refreshToken,
      isUpdateProfile: findUser.isUpdatedProfile
    }
  }

  public async login(userData: User): Promise<{ 
    accessToken: string; 
    refreshToken: string; 
    isUpdateProfile: boolean; 
  }> 
  {
    const findUser: User = await UserModel.findOne({ email: userData.email },{__v:0 , createdAt: 0 , updatedAt:0}).lean();
    if (!findUser) throw HttpException.BAD_REQUEST("Email or password is incorrect");

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw HttpException.BAD_REQUEST("Email or password is incorrect");

    const tokenDataPack: DataStoredInToken = {
      userId: findUser._id,
      userEmail: findUser.email, 
      isUpdateProfile: findUser.isUpdatedProfile
    }

    const accessToken:string = createAccessToken(tokenDataPack);
    const refreshToken:string = createRefreshToken(tokenDataPack);

    return{
      accessToken,
      refreshToken,
      isUpdateProfile: findUser.isUpdatedProfile
    }
  }
  
  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
