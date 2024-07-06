import { UserModel } from "../users.model";

export const findUserByEmail = async (email:string, select: object = {}) => 
{
    const findUser = await UserModel.findOne({
        email: email
    },select)
    .lean()

    return findUser;
}