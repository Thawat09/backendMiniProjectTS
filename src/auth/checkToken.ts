import { Request, Response, NextFunction } from 'express';
import config from '../configs/app'
import tokenHelper from '../helpers/token/token.helper';

const accessTokenSecretKey = config.access_token_secret;
const storedBase64Key = config.encrypt_token_secret;

//TODO Middleware สำหรับตรวจสอบและถอดรหัส token
const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    // รับ token จาก header, query string หรือ body
    const token = req.headers['bearer-authorization'] || req.query.token || req.body.token;

    // ถ้าไม่มี token
    if (!token) {
        return res.status(403).json({ success: false, message: 'ไม่พบ token' });
    }

    try {
        // ตรวจสอบและถอดรหัส token
        const decryptedString = await tokenHelper.decodeSecure(token, storedBase64Key!);

        // ตรวจสอบและถอดรหัส token
        const decoded = await tokenHelper.verifyToken(decryptedString);

        // ถ้า token ถูกต้องให้เก็บข้อมูลผู้ใช้ใน request object และเรียกฟังก์ชั่นต่อไปในการทำงาน
        req.user = decoded;
        next();
    } catch (err) {
        // ถ้า token ไม่ถูกต้อง
        return res.status(401).json({ success: false, message: 'Token ไม่ถูกต้อง' });
    }
};

//TODO ส่งออกฟังก์ชัน checkToken เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export { checkToken };