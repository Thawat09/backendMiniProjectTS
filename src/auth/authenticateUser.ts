// นำเข้าชนิดของข้อมูล Request จาก Express framework และเปลี่ยนชื่อเป็น ExpressRequest เพื่อหลีกเลี่ยงความขัดแย้ง
import { Request as ExpressRequest, Response, NextFunction } from 'express';
// นำเข้า passport เพื่อใช้ในการจัดการการยืนยันตัวตน
import passport from 'passport';

// กำหนด property 'user' เพิ่มเข้าไปใน interface ของ Express Request
interface Request extends ExpressRequest {
    user?: any;
}

// สร้างฟังก์ชัน authenticateUser เพื่อทำการตรวจสอบการยืนยันตัวตนของผู้ใช้
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // ใช้ passport.authenticate() เพื่อดำเนินการตรวจสอบการยืนยันตัวตน โดยใช้วิธีการ local strategy
    passport.authenticate('local', (err: any, user: any, info: any) => {
        // ถ้าเกิดข้อผิดพลาดในระหว่างกระบวนการตรวจสอบ
        if (err) {
            return next(err);
        }
        // ถ้าไม่พบผู้ใช้
        if (!user) {
            // ส่งข้อความข้อผิดพลาด Unauthorized กลับไป
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // กำหนดค่า user ให้กับ property 'user' ของ Request object
        req.user = user;
        // เรียกฟังก์ชันถัดไปในลำดับ (middleware chain)
        return next();
    })(req, res, next); // นำ req, res, next เข้าไปเป็นพารามิเตอร์ของ callback function ที่ส่งให้ passport.authenticate()
};

// ส่งออกฟังก์ชัน authenticateUser เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export { authenticateUser };