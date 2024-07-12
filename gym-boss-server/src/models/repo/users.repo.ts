import { UserModel } from "../users.model";

const findUserByEmail = async (email:string, select: object = {}) => 
{
    const findUser = await UserModel.findOne({
        email: email
    },select)
    .lean()

    return findUser;
}

const findUserById = async (uid: string, select: object = {}) => {

    const findUser = await UserModel.findById(uid,select).lean()

    return findUser;
}

export {
    findUserByEmail,
    findUserById
}