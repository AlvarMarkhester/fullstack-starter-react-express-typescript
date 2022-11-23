import { IUser, User } from "../models/user.model";

class UserService{
    async getById(resourceId: string) {
        return User.findOne({ _id: resourceId });
    };
    async updateById(resourceId: string, user: IUser) {
        return User.findOneAndUpdate({ _id: resourceId }, user);
    };
    async create(resource: IUser) {
        const user = new User(resource);
        return user.save()
    }
    async deleteById(resourceId: string) {
        return User.deleteOne({ _id: resourceId})
    };

    async findByEmail(email: string) {
        return User.findOne({email: email})
    }
}

export default new UserService();