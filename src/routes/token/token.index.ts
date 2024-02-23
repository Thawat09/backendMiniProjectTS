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
router.post('/verify-token', validateUsernameAndPassword, token.verifyToken);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;