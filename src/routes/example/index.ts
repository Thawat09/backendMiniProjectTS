// นำเข้าคลาส Router จาก Express framework
import { Router } from 'express';

// นำเข้าคอนโทรลเลอร์ indexController จากโฟลเดอร์ controllers/example/example.controller
import indexController from '../../controllers/example/example.comtroller';

// สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

// ใช้ indexController เมื่อมีการเรียกใช้งานเส้นทางหลัก ('/')
router.use('/', indexController);

// ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;