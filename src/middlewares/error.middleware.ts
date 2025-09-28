import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/common/errors';

export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	const e = err as AppError;
	const status = e?.statusCode ?? 500;
	const message = e?.message ?? 'Internal Server Error';
	res.status(status).json({ error: { message } });
}
