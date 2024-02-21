//TODO นำเข้าชนิดของข้อมูล Request จาก Express framework และเปลี่ยนชื่อเป็น ExpressRequest เพื่อหลีกเลี่ยงความขัดแย้ง
import { Request as ExpressRequest, Response, NextFunction } from 'express';

//TODO นำเข้าโมดูล
import passport from 'passport'; //? passport เพื่อใช้ในการจัดการการยืนยันตัวตน
import { Strategy as LocalStrategy } from 'passport-local'; //? Strategy ของ local authentication จาก passport-local

//TODO นำเส้นทาง
import { users } from './users'; //? นำเข้าข้อมูลผู้ใช้งาน (ในที่นี้คือ users) จากไฟล์ users

//TODO กำหนด property 'user' เพิ่มเข้าไปใน interface ของ Express Request
interface Request extends ExpressRequest {
    user?: any;
}

//TODO สร้างฟังก์ชัน authenticateUser เพื่อทำการตรวจสอบการยืนยันตัวตนของผู้ใช้
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

//TODO กำหนดการใช้งานของ LocalStrategy โดยระบุ usernameField เป็น 'email' และ passwordField เป็น 'password'
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    // ฟังก์ชัน callback ที่ใช้ในการตรวจสอบการยืนยันตัวตน
    (email: string, password: string, done: any) => {
        // ค้นหาผู้ใช้ใน users ที่มี email และ password ตรงกับที่รับมา
        const user = users.find((u) => u.email === email && u.password === password);
        // ถ้าไม่พบผู้ใช้
        if (!user) {
            // ส่งข้อความข้อผิดพลาดกลับไป
            return done(null, false, { message: 'Incorrect email or password' });
        }
        // หากพบผู้ใช้ ส่งข้อมูลของผู้ใช้ไปยัง callback ต่อไป
        return done(null, user);
    }
));

//TODO ส่งออกฟังก์ชัน authenticateUser เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export { authenticateUser };