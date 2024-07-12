import {Strategy as GoogleStrategy, Profile, VerifyCallback} from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '.';
import { PassportStatic } from "passport";
import { User } from "@/interfaces/users.interface";
import Container from "typedi";
import { AuthService } from "@/services/auth.service";
import { findUserByEmail } from "@/models/repo/users.repo";

const authService = Container.get(AuthService)
export function configurePassport(passport:PassportStatic){
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken:string, refreshToken:string, profile: Profile, done: VerifyCallback) => {
            try {

               const findUser = await findUserByEmail(profile._json.email,{_id:1});
               
               if(!findUser){
                const newUser: User = {
                    email: profile._json.email,
                    password: profile.id,
                    userName: profile.displayName,
                    userAvatarURL: profile.photos[0].value
                }
                 
                await authService.signup(newUser);
                // await authService.googleAuthSignUp(newUser, newUserProfile);
               }
              
               const loginData = await authService.googleAuthLogin(profile._json.email);

                done(null,loginData);
               
            } catch (error) {
                done(error)
            }
            
        }
    ))

    // passport.serializeUser((user: Profile, done) => {
    //     done(null, user._json.email)
    //   })
    
    //   // used to deserialize the user
    // passport.deserializeUser(async (email:string , done) => {

    // try {
    //         const findUser = await findUserByEmail(email);
    //         done(null, findUser)
    // } 
    // catch (error) {
    //     done(error, null)
    // }
    // })

}





