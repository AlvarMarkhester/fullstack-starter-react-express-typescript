import express from 'express';
import userController from '../controllers/user.controller';

const userRoutes = express.Router();

userRoutes.route("/create").post(userController.create);
userRoutes.route("/profile/update").put(userController.updateUserById)
userRoutes.route("/profile").get(userController.getProfile);
userRoutes.route("/profile/:userId").get(userController.getProfileById);
userRoutes.route("/customer/:customerId").get(userController.getAllCustomerUsers);

export default userRoutes