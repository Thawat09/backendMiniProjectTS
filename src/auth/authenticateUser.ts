//TODO นำเข้าชนิดของข้อมูล Request จาก Express framework และเปลี่ยนชื่อเป็น ExpressRequest เพื่อหลีกเลี่ยงความขัดแย้ง
import { Request as ExpressRequest, Response, NextFunction } from 'express';

//TODO นำเข้าโมดูล
import passport from 'passport'; //? passport เพื่อใช้ในการจัดการการยืนยันตัวตน
import { BasicStrategy } from 'passport-http'; //? BasicStrategy ของ http authentication จาก passport-http
import { body } from 'express-validator'; //? validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

//TODO นำเส้นทาง
import { users } from './users'; //? นำเข้าข้อมูลผู้ใช้งาน (ในที่นี้คือ users) จากไฟล์ users
import Logger from '../helpers/logs/logs.helper'; //? logs

//TODO กำหนด property 'user' เพิ่มเข้าไปใน interface ของ Express Request
interface Request extends ExpressRequest {
    user?: any;
}

//TODO สร้างฟังก์ชัน authenticateUser เพื่อทำการตรวจสอบการยืนยันตัวตนของผู้ใช้
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // ใช้ passport.authenticate เพื่อตรวจสอบการยืนยันตัวตนโดยใช้วิธีการ Basic Authentication
    passport.authenticate('basic', { session: false }, (err: any, user: any, info: any) => {
        // หากเกิดข้อผิดพลาดระหว่างการยืนยันตัวตน
        if (err) {
            // บันทึกข้อผิดพลาดลงใน logs
            Logger.logError('Error during authentication:', req);
            return next(err);
        }
        // หากไม่พบผู้ใช้หรือการยืนยันตัวตนไม่สำเร็จ
        if (!user) {
            // บันทึกลงใน logs และส่งข้อความ "Unauthorized" พร้อมกับสถานะ 401 กลับไปหา client
            Logger.logWarn('Unauthorized access attempt:', req);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // ถ้าการยืนยันตัวตนสำเร็จ กำหนดข้อมูลผู้ใช้ใน object request (req.user) และไปยัง middleware ถัดไป
        req.user = user;
        Logger.logInfo(`User "${req.user.username}" has been successfully authenticated.`, req);
        return next();
    })(req, res, next); // ส่ง request, response, และ next function ไปยัง passport.authenticate
};

//TODO กำหนดการใช้งานของ LocalStrategy โดยระบุ usernameField เป็น 'email' และ passwordField เป็น 'password'
passport.use(new BasicStrategy(
    (username: string, password: string, done: any) => {
        // ค้นหาผู้ใช้ใน users ที่มี email และ password ตรงกับที่รับมา
        const user = users.find((u) => u.username === username && u.password === password);
        // ถ้าไม่พบผู้ใช้
        if (!user) {
            // ส่งข้อความข้อผิดพลาดกลับไป
            return done(null, false, { message: 'Incorrect email or password' });
        }
        // หากพบผู้ใช้ ส่งข้อมูลของผู้ใช้ไปยัง callback ต่อไป
        return done(null, user);
    }
));

// ตรวจสอบค่าของ username และ password
const validateUsernameAndPassword = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

//TODO ส่งออกฟังก์ชัน authenticateUser เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export { authenticateUser, validateUsernameAndPassword };