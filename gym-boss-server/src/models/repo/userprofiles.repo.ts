import { UserProfileModel } from "../userprofiles.model";


export const findUserProfileByEmail = async (email:string, select: object = {}) => 
{
    const findUserProfile = await UserProfileModel.findOne({
        email: email
    },select)
    .lean()

    return findUserProfile;
}