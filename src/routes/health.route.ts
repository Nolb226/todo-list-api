/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: Kiểm tra trạng thái service
 *
 * /health/check:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     responses:
 *       '200':
 *         description: Service đang hoạt động
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
import { Router } from 'express';

const healthRoute: Router = Router();
healthRoute.route('/check').get((req, res) => {
	res.status(200).send('OK');
});
export default healthRoute;
