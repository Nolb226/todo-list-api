import { OpenAPIV3 } from 'openapi-types';
import swaggerJsdoc from 'swagger-jsdoc';

const openapiBase: OpenAPIV3.Document = {
	openapi: '3.0.3',
	info: {
		title: 'Todo List API',
		description: 'API docs cho dự án Todo List API',
		version: '1.0.0',
	},
	servers: [{ url: '/api/v1', description: 'Base path cho v1' }],
	components: {
		securitySchemes: {
			bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
		},
	},
	security: [{ bearerAuth: [] }],
	paths: {},
};

export const swaggerSpec = swaggerJsdoc({
	definition: openapiBase,
	apis: [
		'src/routes/**/*.ts',
		'src/modules/**/*.route.ts',
		'src/modules/**/*.controller.ts',
	],
});
