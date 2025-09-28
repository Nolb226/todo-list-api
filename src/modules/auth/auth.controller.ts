import { NextFunction, Request, Response } from 'express';
import authService from './auth.service';
class AuthController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.register(req.body);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authService.login(req.body);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
