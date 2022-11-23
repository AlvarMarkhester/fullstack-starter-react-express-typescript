import { User } from "../models/user.model";
import bcrypt from "bcrypt"


class ClientService{
  async findUserByEmail(email: string) {
    const user = await User.findOne({ email })
    return user
  }
}
export default new ClientService;