/**
 * @openapi
 * tags:
 *   - name: Tasks
 *     description: API quản lý công việc (task)
 *
 * /todos:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Lấy danh sách công việc của người dùng hiện tại
 *     description: Trả về danh sách task của người dùng đã xác thực. Hỗ trợ phân trang và lọc (nếu được triển khai ở controller).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Danh sách task trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 meta:
 *                   type: object
 *                   description: Thông tin phân trang (nếu có)
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Tạo mới một công việc
 *     description: Tạo một task mới cho người dùng hiện tại. Yêu cầu payload hợp lệ theo schema CreateTask.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       '201':
 *         description: Task được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /todos/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: ID của task
 *       schema:
 *         type: string
 *
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Cập nhật một công việc theo ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       '200':
 *         description: Task được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Xóa một công việc theo ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Xóa thành công, không có nội dung trả về
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Tiêu đề công việc
 *         description:
 *           type: string
 *           description: Mô tả chi tiết (không bắt buộc)
 *
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   responses:
 *     Unauthorized:
 *       description: Yêu cầu xác thực không hợp lệ hoặc thiếu token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     BadRequest:
 *       description: Dữ liệu gửi lên không hợp lệ
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *     NotFound:
 *       description: Không tìm thấy tài nguyên
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */
import { requireAuth } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import taskController from './task.controller';
import { validate } from '@/lib';
import { taskRequirement } from './task.requirement';

const taskRoute = Router();

taskRoute
	.route('/')
	.get(requireAuth, taskController.getTasks)
	.post(
		requireAuth,
		validate(taskRequirement.createTask),
		taskController.createTask
	);

taskRoute
	.route('/:id')
	.put(
		requireAuth,
		validate(taskRequirement.updateTask),
		taskController.updateTask
	)
	.delete(requireAuth, taskController.deleteTask);

export default taskRoute;
