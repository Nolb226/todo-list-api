import express from 'express';
import api from '@/routes';
import { errorHandler } from '@/middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/openapi';
const app = express();
app.use(express.json());

app.use('/api/v1/', api);

// Serve Swagger UI (use `app.use` so the static assets under the docs path are served)
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customSiteTitle: 'Todo List API Docs',
	})
);

app.use((_req, res) =>
	res.status(404).json({ error: { message: 'Not Found' } })
);

app.use(errorHandler);

export default app;
