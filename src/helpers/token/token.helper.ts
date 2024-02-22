import jwt, { VerifyErrors } from 'jsonwebtoken';

//TODO สร้าง interface สำหรับข้อมูลผู้ใช้
interface User {
    id: string;
    username: string;
}

//TODO กำหนดคีย์ลับสำหรับการสร้างและตรวจสอบ token
const secretKey = 'yourSecretKey'; // ใส่คีย์ลับของคุณที่นี่

//TODO สร้าง methods object ที่ประกอบด้วยฟังก์ชันสำหรับสร้างและตรวจสอบ token
const methods = {
    // สร้าง token จากข้อมูลผู้ใช้
    generateToken: (user: User): string => {
        const payload = { id: user.id, username: user.username };
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });
    },

    // ตรวจสอบและถอดรหัส token
    verifyToken: (token: string, callback: (err: VerifyErrors | null, decoded?: any) => void): void => {
        jwt.verify(token, secretKey, callback);
    }
};

//TODO ส่งออก methods object เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของแอปพลิเคชัน
export default methods;