import { body } from 'express-validator';

export const taskRequirement = {
	createTask: [
		body('title')
			.isString()
			.notEmpty()
			.withMessage('Title is required and must be a string'),
		body('description')
			.optional()
			.isString()
			.withMessage('Description must be a string if provided'),
	],
	updateTask: [
		body('title').isString().withMessage('Title must be a string if provided'),
		body('description')
			.isString()
			.withMessage('Description must be a string if provided')
			.optional(),
		body('completed')
			.isBoolean()
			.withMessage('Completed must be a boolean if provided')
			.optional(),
	],
};
