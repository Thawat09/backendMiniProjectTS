//TODO นำเข้าฟังก์ชัน
import { validationResult } from 'express-validator'; //? นำเข้าฟังก์ชัน validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล
import { Request, Response } from 'express'; //? นำเข้าชนิดของข้อมูล Request และ Response จาก Express framework
import tokenHelper from '../../helpers/token/token.helper'; //? นำเข้า methods object จาก token.helper เพื่อใช้ในการสร้าง token

//TODO นำเข้าค่า configuration จากไฟล์ app.js
import config from '../../configs/app';

const storedBase64Key = config.encrypt_token_secret;

//TODO ฟังก์ชัน genToken ที่จะใช้ในการควบคุมการทำงานของเส้นทาง
export const genToken = async (req: Request, res: Response) => {
    // ตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมากับคำขอ
    const errors = validationResult(req);

    // หากมีข้อผิดพลาด
    if (!errors.isEmpty()) {
        // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อผิดพลาดทั้งหมด
        return res.status(400).json({ errors: errors.array() });
    }

    // หากไม่มีข้อผิดพลาด
    // สร้าง token จากข้อมูลผู้ใช้ที่ถูกส่งมากับคำขอ
    const user = req.body.username; // สมมติว่าข้อมูลผู้ใช้ถูกส่งมาในรูปแบบ { id: string, username: string }
    const token = tokenHelper.generateToken(user);

    // เรียกใช้งาน encodeSecure และเก็บผลลัพธ์ไว้ในตัวแปร encodedString
    const encodedString = await tokenHelper.encodeSecure(token, storedBase64Key!);
    console.log(encodedString);

    // ส่งคำตอบกลับพร้อมกับ token
    res.status(200).json({ encodedString });
};

export const verifyToken = async (req: Request, res: Response, next: Function) => {
    // ดึงค่า token จาก header ของคำขอ
    const token = req.header('bearer-authorization');

    // ถ้าไม่มี token
    if (!token) {
        // ส่งคำตอบกลับด้วยสถานะ 401 (Unauthorized) พร้อมกับข้อความแจ้งเตือน
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // เรียกใช้งาน decodeSecure และเก็บผลลัพธ์ไว้ในตัวแปร decryptedString
        const decryptedString = await tokenHelper.decodeSecure(token, storedBase64Key!);

        // ตรวจสอบและถอดรหัส token
        const decoded = await tokenHelper.verifyToken(decryptedString);

        // ในกรณีที่ token ถูกต้อง
        // ส่งคำตอบกลับพร้อมกับ token
        res.status(200).json({ decoded });

        // ดำเนินการ middleware ต่อไป
        next();
    } catch (error) {
        // ในกรณีที่เกิดข้อผิดพลาดในการตรวจสอบ token
        if ((error as Error).message === 'Token Expired') {
            // กรณี token หมดอายุ
            res.status(401).json({ message: 'Token Expired.' });
        } else {
            // กรณีข้อผิดพลาดอื่น ๆ
            // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อความแจ้งเตือน
            res.status(400).json({ message: 'Invalid token.' });
        }
    }
};

//TODO ส่งออกฟังก์ชัน genToken เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
export default { genToken, verifyToken };