import { NextFunction, Request, Response } from 'express';
import taskService from './task.service';
import { GetTaskQuerySchema } from './task.schema';

const taskController = {
	getTasks: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsed = GetTaskQuerySchema.safeParse(req.query);
			if (!parsed.success) {
				return res
					.status(400)
					.json({ error: { message: 'Invalid query parameters' } });
			}

			const user = req.user as { id: string };

			const result = await taskService.getTasks(user, parsed.data);
			res.status(200).json({ ...result });
		} catch (error) {
			next(error);
		}
	},
	createTask: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user as { id: string };
			const result = await taskService.createTask(user, req.body);
			res.status(200).json({ result });
		} catch (error) {
			next(error);
		}
	},
	updateTask: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user as { id: string };
			const result = await taskService.updateTask(
				user,
				req.params.id,
				req.body
			);
			res.status(200).json({ result });
		} catch (error) {
			next(error);
		}
	},
	deleteTask: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user as { id: string };
			const result = await taskService.deleteTask(user, req.params.id);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	},
};

export default taskController;
