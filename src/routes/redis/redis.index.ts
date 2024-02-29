//TODO นำเข้าคลาส
import { Router } from 'express'; //? Router จาก Express framework

//TODO นำเข้าคอนโทรลเลอร์
import redis from '../../controllers/redis/redis.controller'; //? redis จากโฟลเดอร์ controllers/redis/redis.controller

//TODO สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

//TODO ใช้ redis เมื่อมีการเรียกใช้งานเส้นทางหลัก ('/')
router.get('/', redis.getAll);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;