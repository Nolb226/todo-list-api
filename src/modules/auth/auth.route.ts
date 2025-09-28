import { Router } from 'express';
import authController from './auth.controller';
import { validate } from '@/lib';
import { authRequirement } from './auth.requirement';

const authRoute: Router = Router();

authRoute
	.route('/register')
	.post(validate(authRequirement.register), authController.register);
authRoute
	.route('/login')
	.post(validate(authRequirement.login), authController.login);

export default authRoute;
