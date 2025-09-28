import { z } from 'zod';

export const GetTaskQuerySchema = z.object({
	page: z.preprocess((v) => Number(v ?? 1), z.number().min(1).default(1)),
	limit: z.preprocess(
		(v) => Number(v ?? 10),
		z.number().min(1).max(100).default(10)
	),
});
export type GetTaskQuery = z.infer<typeof GetTaskQuerySchema>;
