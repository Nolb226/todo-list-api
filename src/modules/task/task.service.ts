import taskRepo from './task.repo';
import { GetTaskQuery } from './task.schema';

const taskService = {
	getTasks: (currentUser: { id: string }, query: GetTaskQuery) => {
		return taskRepo.listByFilter(currentUser, query);
	},
	createTask: (
		currentUser: {
			id: string;
		},
		data: { title: string; description?: string }
	) => {
		return taskRepo.createTask({
			title: data.title,
			description: data.description,
			userId: currentUser.id,
		});
	},
	updateTask: async (
		currentUser: { id: string },
		taskId: string,
		data: { title?: string; description?: string; completed?: boolean }
	) => {
		const task = await taskRepo.findById(taskId);
		if (!task) {
			throw new Error('Task not found');
		}
		if (task.userId !== currentUser.id) {
			throw new Error('Forbidden');
		}
		return taskRepo.updateTask(taskId, {
			title: data.title ?? task.title,
			description: data.description,
			completed: data.completed ?? task.completed,
			userId: currentUser.id,
		});
	},
	deleteTask: async (currentUser: { id: string }, taskId: string) => {
		const task = await taskRepo.findById(taskId);
		if (!task) {
			throw new Error('Task not found');
		}
		if (task.userId !== currentUser.id) {
			throw new Error('Forbidden');
		}
		await taskRepo.deleteTask(taskId);
		return { message: 'Task deleted successfully' };
	},
};
export default taskService;
