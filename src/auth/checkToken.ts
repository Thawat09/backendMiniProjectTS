//TODO เรียกใช้งาน JSON Web Token (JWT) เพื่อตรวจสอบและถอดรหัส token
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configs/app'

//TODO Middleware สำหรับตรวจสอบและถอดรหัส token
const checkToken = (req: Request, res: Response, next: NextFunction) => {
    // รับ token จาก header, query string หรือ body
    const token = req.headers['authorization'] || req.query.token || req.body.token;

    // ถ้าไม่มี token
    if (!token) {
        return res.status(403).json({ success: false, message: 'ไม่พบ token' });
    }

    // ตรวจสอบและถอดรหัส token
    jwt.verify(token, config.jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            // ถ้า token ไม่ถูกต้อง
            return res.status(401).json({ success: false, message: 'Token ไม่ถูกต้อง' });
        } else {
            // ถ้า token ถูกต้องให้เก็บข้อมูลผู้ใช้ใน request object และเรียกฟังก์ชั่นต่อไปในการทำงาน
            req.user = decoded;
            next();
        }
    });
};

//TODO ส่งออกฟังก์ชัน checkToken เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export { checkToken };