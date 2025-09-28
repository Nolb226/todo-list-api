import { verifyToken } from '@/utils/jwt.util';
import { NextFunction, Request, Response } from 'express';

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const raw = req.headers.authorization ?? '';
	const token = raw.startsWith('Bearer ') ? raw.slice(7) : undefined;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const payload = await verifyToken(token);
		req.user = { id: payload.id };
		next();
	} catch (error) {
		next(error);
	}
}
