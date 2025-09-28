import app from '@/app';
import config from '@/config/config';

const server = app.listen(config.port, () => {
	console.log(`🚀 Server is running on port ${config.port}`);
	console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
	console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
});

process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully');
	server.close(() => {
		console.log('Process terminated');
	});
});
