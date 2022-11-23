import { Types, Schema, Model, model, Document } from "mongoose";
import bcrypt from "bcrypt"
import { ROLES } from "../auth/roles";

export interface IUser{
    admin: boolean;
    name: string;
    email: string;
    password: string;
    roles: ROLES[]
}
export interface IUserDocument extends IUser, Document {
  isCorrectPassword: (password: string) => Promise<boolean>
}


const UserSchema= new Schema<IUserDocument>(
    {
      admin: {type: Boolean, required: true, default: false},
      name: {type: String, required: true},
      email: {type: String, required: true},
      password: {type: String, required: false, select: false},
      roles: [{type: String, required: false}]
    },
    {
        timestamps: true,
    }
  );

  UserSchema.methods.isCorrectPassword = async function (password: string) {
    const user = await User.findOne({email: this.email}).select("+password")
    if(user) {
      return await bcrypt.compare(password, user.password)
    }
    return Error("Error comparing password")
  };

export const User = model<IUserDocument>("User", UserSchema);
