import express from 'express';
import api from '@/routes';
import { errorHandler } from '@/middlewares/error.middleware';

const app = express();
app.use(express.json());

app.use('/api/v1/', api);

app.use((_req, res) =>
	res.status(404).json({ error: { message: 'Not Found' } })
);

app.use(errorHandler);

export default app;
