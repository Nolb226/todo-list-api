import { Router } from 'express';

const healthRoute: Router = Router();
healthRoute.route('/check').get((req, res) => {
	res.status(200).send('OK');
});
export default healthRoute;
