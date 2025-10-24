/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: API quản lý người dùng
 *
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy danh sách người dùng
 *     description: Trả về danh sách người dùng. Yêu cầu xác thực nếu endpoint được bảo vệ.
 *     responses:
 *       '200':
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import { Router } from 'express';
import userController from './user.controller';

const userRoute: Router = Router();

userRoute.route('/').get(userController.getUsers);

export default userRoute;
