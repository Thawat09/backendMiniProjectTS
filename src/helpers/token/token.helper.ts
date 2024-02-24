import jwt, { VerifyErrors } from 'jsonwebtoken';
import * as crypto from 'crypto';
import config from '../../configs/app';

//TODO สร้าง interface สำหรับข้อมูลผู้ใช้
interface User {
    id: string;
    username: string;
}

//TODO กำหนดคีย์ลับสำหรับการสร้างและตรวจสอบ token
const accessTokenSecretKey = config.access_token_secret;
const accessRefreshTokenSecretKey = config.refresh_token_secret;
const tokenEXP = config.access_token_exp;
const refreshTokenEXP = config.refresh_token_exp;

//TODO สร้าง methods object ที่ประกอบด้วยฟังก์ชันสำหรับสร้างและตรวจสอบ token
const methods = {
    // สร้าง token จากข้อมูลผู้ใช้
    generateToken: (user: User): string => {
        const payload = { id: user.id, username: user };
        return jwt.sign(payload, accessTokenSecretKey!, { expiresIn: tokenEXP });
    },

    // สร้าง refresh token จากข้อมูลผู้ใช้
    generateRefreshToken: (user: User): string => {
        const payload = { id: user.id, username: user };
        return jwt.sign(payload, accessRefreshTokenSecretKey!, { expiresIn: refreshTokenEXP });
    },

    // ตรวจสอบและถอดรหัส token
    verifyToken: (token: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecretKey!, (err: VerifyErrors | null, decoded?: any) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        // กรณี token หมดอายุ
                        reject(new Error('Token Expired'));
                    } else {
                        // กรณีข้อผิดพลาดอื่น ๆ
                        reject(err);
                    }
                } else {
                    resolve(decoded);
                }
            });
        });
    },

    // ตรวจสอบและถอดรหัส refresh token
    verifyRefreshToken: (token: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessRefreshTokenSecretKey!, (err: VerifyErrors | null, decoded?: any) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        // กรณี token หมดอายุ
                        reject(new Error('Refresh Token Expired'));
                    } else {
                        // กรณีข้อผิดพลาดอื่น ๆ
                        reject(err);
                    }
                } else {
                    resolve(decoded);
                }
            });
        });
    },

    // ถอดรหัส token เพื่อแปลงเป็นข้อมูลผู้ใช้
    decodeToken: (token: string): User | null => {
        try {
            const decoded = jwt.verify(token, accessTokenSecretKey!) as { id: string, username: string };
            // ดาวน์แคสตัวเองเพื่อให้ TypeScript เข้าใจว่า decoded มีรูปแบบของข้อมูลเป็นแบบ { id: string, username: string }
            return { id: decoded.id, username: decoded.username };
        } catch (error) {
            // กรณีถ้าเกิดข้อผิดพลาดในการถอดรหัส token หรือ token ไม่ถูกต้อง
            console.error('Error decoding token:', error);
            return null;
        }
    },

    // ถอดรหัส refresh token เพื่อแปลงเป็นข้อมูลผู้ใช้
    decodeRefreshToken: (token: string): User | null => {
        try {
            const decoded = jwt.verify(token, accessRefreshTokenSecretKey!) as { id: string, username: string };
            // ดาวน์แคสตัวเองเพื่อให้ TypeScript เข้าใจว่า decoded มีรูปแบบของข้อมูลเป็นแบบ { id: string, username: string }
            return { id: decoded.id, username: decoded.username };
        } catch (error) {
            // กรณีถ้าเกิดข้อผิดพลาดในการถอดรหัส token หรือ token ไม่ถูกต้อง
            console.error('Error decoding refresh token:', error);
            return null;
        }
    },

    // ฟังก์ชันสำหรับเข้ารหัสข้อความโดยใช้วิธีการเข้ารหัสที่ปลอดภัย
    encodeSecure: async (text: string, storedBase64Key: string): Promise<string> => {
        try {
            const key = Buffer.from(storedBase64Key, 'base64');
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            let encryptedText = cipher.update(text, 'utf8', 'hex');
            encryptedText += cipher.final('hex');
            return JSON.stringify({ iv: iv.toString('hex'), encryptedText });
        } catch (error) {
            throw new Error('Encryption failed');
        }
    },

    // ฟังก์ชันสำหรับถอดรหัสข้อความที่ถูกเข้ารหัสด้วยวิธีการเข้ารหัสที่ปลอดภัย
    decodeSecure: async (encodedText: string, storedBase64Key: string): Promise<string> => {
        try {
            const key = Buffer.from(storedBase64Key, 'base64');
            const data = JSON.parse(encodedText);
            const iv = Buffer.from(data.iv, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decryptedText = decipher.update(data.encryptedText, 'hex', 'utf8');
            decryptedText += decipher.final('utf8');
            return decryptedText;
        } catch (error) {
            throw new Error('Decryption failed');
        }
    },
};

//TODO ส่งออก methods object เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของแอปพลิเคชัน
export default methods;