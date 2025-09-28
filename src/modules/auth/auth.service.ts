import { signToken } from '@/utils/jwt.util';
import userRepo from '../user/user.repo';
import bcrypt from 'bcryptjs';

const authService = {
	async register(input: { email: string; name: string; password: string }) {
		const { email, password } = input;
		const exists = await userRepo.findByEmail(email);
		if (exists) throw new Error('User already exists');
		const hashedPassword = bcrypt.hashSync(password, 12);
		const created = await userRepo.createUser({
			...input,
			password: hashedPassword,
		});
		const token = await signToken(created.id);
		return { token };
	},
	async login(input: { email: string; password: string }) {
		const { email, password } = input;
		const user = await userRepo.findByEmail(email);
		if (!user) throw new Error('Invalid username or password');
		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) throw new Error('Invalid username or password');
		const token = await signToken(user.id);
		return { token };
	},
};
export default authService;
