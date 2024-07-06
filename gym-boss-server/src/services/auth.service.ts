import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { SaltRound, TokenExpireTime } from '@/config/auth.config';
import { UserProfileModel } from '@/models/userprofiles.model';


const createToken = (data:DataStoredInToken): string => {
  const token: string = sign(data, SECRET_KEY, { expiresIn: TokenExpireTime })
  return token;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
  
    if (findUser) throw HttpException.BAD_REQUEST(`This email ${userData.email} already exists`);

    const hashedPassword: string = await hash(userData.password, SaltRound);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });
    await UserProfileModel.create({email: userData.email})

    return createUserData;
  }
     
  public async login(userData: User): Promise<{ token: string; userInfo: object }> {
    const findUser: User = await UserModel.findOne({ email: userData.email },{__v:0 , createdAt: 0 , updatedAt:0}).lean();
    if (!findUser) throw HttpException.BAD_REQUEST("Email or password is incorrect");

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw HttpException.BAD_REQUEST("Email or password is incorrect");

    const findUserProfile = await UserProfileModel.findOne({
      email: userData.email
    },{ firstUpdate: 1}).lean()

    const tokenData:string = findUserProfile.firstUpdate? 
    createToken({user: findUser , isUpdateProfile: true}):
    createToken({user: findUser , isUpdateProfile: false});

    return{
      token: tokenData,
      userInfo:{
        _id: findUser._id.toString(),
        isUpdateProfile: findUserProfile.firstUpdate ? true: false
      }
    }
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
