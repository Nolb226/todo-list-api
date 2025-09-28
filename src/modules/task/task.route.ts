import { requireAuth } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import taskController from './task.controller';
import { validate } from '@/lib';
import { taskRequirement } from './task.requirement';

const taskRoute = Router();

taskRoute
	.route('/')
	.get(requireAuth, taskController.getTasks)
	.post(
		requireAuth,
		validate(taskRequirement.createTask),
		taskController.createTask
	);

taskRoute
	.route('/:id')
	.put(
		requireAuth,
		validate(taskRequirement.updateTask),
		taskController.updateTask
	)
	.delete(requireAuth, taskController.deleteTask);

export default taskRoute;
