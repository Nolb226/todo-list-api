import dotenv from 'dotenv';
dotenv.config();

interface Config {
	port: number;
	SECRET_KEY: string;
	nodeEnv?: string;
}

const config: Config = {
	port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
	SECRET_KEY: process.env.SECRET_KEY || 'your_secret_key',
	nodeEnv: process.env.NODE_ENV || 'development',
};
export default config;
