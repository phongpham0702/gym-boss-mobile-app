import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@config';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { AccessTokenExpireIn, RefreshTokenExpireIn } from '@/config/auth.config';
import { TokenModel } from '@/models/tokens.model';

export const createAccessToken = (data:DataStoredInToken): string => {
    const token: string = sign(data, ACCESS_TOKEN_SECRET_KEY, { expiresIn: AccessTokenExpireIn })
    return token;
};

export const createRefreshToken = async (data:DataStoredInToken):Promise<string> => {
    const token: string = sign({
        ...data,
    }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: RefreshTokenExpireIn })

    const expireAt = new Date(Date.now() + RefreshTokenExpireIn);

    await TokenModel.create({
        userId: data.userId,
        refreshToken: token,
        expireAt: expireAt
    })

    return token;
}