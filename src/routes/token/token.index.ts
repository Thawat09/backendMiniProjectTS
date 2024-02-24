//TODO นำเข้าคลาส
import { Router } from 'express'; //? Router จาก Express framework

//TODO นำเข้าคอนโทรลเลอร์
import token from '../../controllers/token/token.controller'; //? token จากโฟลเดอร์ controllers/token/token.controller

//TODO นำเข้าฟังก์ชัน
import { validateUsernameAndPassword } from '../../auth/authenticateUser'; //? นำเข้าฟังก์ชัน authenticateUser จากไฟล์ authenticateUser ในโฟลเดอร์ auth

//TODO สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

//TODO ใช้ token เมื่อมีการเรียกใช้งานเส้นทางหลัก ('/')
router.post('/gen-token', validateUsernameAndPassword, token.genToken);
router.post('/gen-refresh-token', validateUsernameAndPassword, token.genRefreshToken);
router.post('/verify-token', validateUsernameAndPassword, token.verifyToken);
router.post('/verify-refresh-token', validateUsernameAndPassword, token.verifyRefreshToken);
router.post('/decode-token', validateUsernameAndPassword, token.decodeToken);
router.post('/decode-refresh-token', validateUsernameAndPassword, token.decodeRefreshToken);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;