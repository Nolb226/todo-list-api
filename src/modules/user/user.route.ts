import { Router } from 'express';
import userController from './user.controller';

const userRoute: Router = Router();

userRoute.route('/').get(userController.getUsers);

export default userRoute;
