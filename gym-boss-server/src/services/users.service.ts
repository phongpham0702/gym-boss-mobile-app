import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

@Service()
export class UserService {

  public async updateUserProfile(userId:string , updateSet:object) {

    const updateProfile = UserModel.updateOne({
      _id: userId
    },
    updateSet
  );
    return updateProfile;
  }
}
