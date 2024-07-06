import {Strategy as GoogleStrategy, Profile, VerifyCallback} from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '.';
import { PassportStatic } from "passport";
import { findUserByEmail } from "@/models/repo/users.repo";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/users.model";


export function configurePassport(passport:PassportStatic){
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken:string, refreshToken:string, profile: Profile, done: VerifyCallback) => {
            console.log(profile);
            console.log(profile.id);
            
            try {
               const findUser = await findUserByEmail(profile._json.email);
               if(!findUser){
                const newUser: User = {
                    email: profile._json.email,
                    userName: profile._json.name,
                    userAvatarURL: profile._json.picture,
                }
                

                await UserModel.create(newUser);

               }
            
                done(null,profile);
               
            } catch (error) {
                done(error)
            }
            
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
      // used to deserialize the user
      passport.deserializeUser((id, done) => {
         done(null, "abc")
      })

}





