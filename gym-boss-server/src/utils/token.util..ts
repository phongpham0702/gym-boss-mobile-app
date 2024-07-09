import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@config';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { AccessTokenExpireIn, RefreshTokenExpireIn } from '@/config/auth.config';


export const createAccessToken = (data:DataStoredInToken): string => {
    const token: string = sign(data, ACCESS_TOKEN_SECRET_KEY, { expiresIn: AccessTokenExpireIn })
    return token;
};

export const createRefreshToken = (data:DataStoredInToken):string => {
    const token: string = sign({
        ...data,
        isRefresh: false
    }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: RefreshTokenExpireIn })
    return token;
}