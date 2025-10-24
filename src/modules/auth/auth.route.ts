/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Xác thực người dùng
 *
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng ký người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayload'
 *     responses:
 *       '201':
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng nhập và nhận JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 * components:
 *   schemas:
 *     RegisterPayload:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         name:
 *           type: string
 *     LoginPayload:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     Unauthorized:
 *       description: Xác thực thất bại
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */
import { Router } from 'express';
import authController from './auth.controller';
import { validate } from '@/lib';
import { authRequirement } from './auth.requirement';

const authRoute: Router = Router();

authRoute
	.route('/register')
	.post(validate(authRequirement.register), authController.register);
authRoute
	.route('/login')
	.post(validate(authRequirement.login), authController.login);

export default authRoute;
