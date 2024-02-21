// นำเข้าคลาส Router จาก Express framework
import { Router } from 'express';

// นำเข้าการตั้งค่าจากโมดูล 'config'
import config from '../configs/app';

// นำเข้าโมดูลของ router เพื่อจัดการเส้นทางตัวอย่าง
import exampleRouter from './example/index';

// นำเข้าฟังก์ชัน authenticateUser จากไฟล์ authenticateUser ในโฟลเดอร์ auth
import { authenticateUser } from '../auth/authenticateUser';

// สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

// ติดตั้ง exampleRouter ภายใต้เส้นทาง API version ที่ระบุ
// พารามิเตอร์ตัวแรกคือเส้นทางของ API ซึ่งประกอบด้วย `/api/${config.version}/example`
// พารามิเตอร์ตัวที่สองคือ middleware authenticateUser เพื่อตรวจสอบการยืนยันตัวตนก่อนทำการเรียกใช้งาน exampleRouter
router.use(`/api/${config.version}/example`, authenticateUser, exampleRouter);

// ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;