import jwt from 'jsonwebtoken';

type JwtPayload = {
	id: string;
};

export const signToken = (
	userId: string,
	expired: jwt.SignOptions['expiresIn'] = '1d'
) => {
	return new Promise<string>((resolve, reject) => {
		jwt.sign(
			{ id: userId, iat: Date.now() },
			process.env.SECRET_KEY as string,
			{ expiresIn: expired },
			(err, token) => {
				if (err || !token) {
					return reject(err);
				}
				resolve(token);
			}
		);
	});
};
export const verifyToken = (token: string) => {
	return new Promise<{ id: string }>((resolve, reject) => {
		jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
			if (
				err ||
				!decoded ||
				typeof decoded !== 'object' ||
				!('id' in decoded)
			) {
				return reject(err || new Error('Invalid token'));
			}
			resolve({ id: (decoded as JwtPayload).id });
		});
	});
};
