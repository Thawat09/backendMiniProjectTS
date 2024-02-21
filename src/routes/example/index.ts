//TODO นำเข้าคลาส
import { Router } from 'express'; //? Router จาก Express framework

//TODO นำเข้าคอนโทรลเลอร์
import indexController from '../../controllers/example/example.comtroller'; //? indexController จากโฟลเดอร์ controllers/example/example.controller

//TODO สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

//TODO ใช้ indexController เมื่อมีการเรียกใช้งานเส้นทางหลัก ('/')
router.use('/', indexController);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;