import { Router } from 'express';
import healthRoute from '@/routes/health.route';
import userRoute from '@/modules/user/user.route';
import authRoute from '@/modules/auth/auth.route';
import taskRoute from '@/modules/task/task.route';

const api: Router = Router();
api.use('/health', healthRoute);
api.use('/auth', authRoute);
api.use('/users', userRoute);
api.use('/todos', taskRoute);
export default api;
