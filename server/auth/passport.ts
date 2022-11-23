import passport from "passport"
import { IUser, IUserDocument, User } from "../models/user.model"
import passportLocal from "passport-local";

declare global {
  namespace Express {
    interface User extends IUserDocument{
    }
  }
}

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: IUserDocument) => done(err, user))
});

passport.use(new passportLocal.Strategy({usernameField: "email"}, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, function (err: Error, user: IUserDocument) {
    if (err) {
      return done(undefined, false, { message: `Email ${email} not found.` })
    }
    if (!user) { return done(undefined, false) }
    user.isCorrectPassword(password)
    .then(isMatch => {
      if (isMatch) {
        return done(undefined, user)
      }
      return done(undefined, false, { message: "Invalid email or password." })
    })
    .catch((err) =>{
      return done(err)
    })
  });
}));