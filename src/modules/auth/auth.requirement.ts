import { body } from 'express-validator';

export const authRequirement = {
	register: [
		body('email').isEmail().withMessage('Valid email is required'),
		body('name')
			.isString()
			.notEmpty()
			.withMessage('Name is required and must be a string'),
		body('password')
			.isString()
			.isLength({ min: 6 })
			.withMessage(
				'Password is required and must be at least 6 characters long'
			),
	],
	login: [
		body('email').isEmail().withMessage('Valid email is required'),
		body('password')
			.isString()
			.isLength({ min: 6 })
			.withMessage(
				'Password is required and must be at least 6 characters long'
			),
	],
};
