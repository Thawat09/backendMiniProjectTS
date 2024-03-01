//TODO นำเข้าโมดูล
import { body } from 'express-validator'; //? validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

// ตรวจสอบค่าของ username และ password
const validateUsernameAndPassword = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

export { validateUsernameAndPassword };