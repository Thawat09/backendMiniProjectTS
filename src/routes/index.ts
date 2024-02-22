//TODO นำเข้าคลาส 
import { Router } from 'express'; //? Router จาก Express framework
import config from '../configs/app'; //? นำเข้าการตั้งค่าจากโมดูล 'config'
import exampleRouter from './example/example.index'; //? นำเข้าโมดูลของ router เพื่อจัดการเส้นทางตัวอย่าง
import { authenticateUser } from '../auth/authenticateUser'; //? นำเข้าฟังก์ชัน authenticateUser จากไฟล์ authenticateUser ในโฟลเดอร์ auth

//TODO สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

//TODO ติดตั้ง exampleRouter ภายใต้เส้นทาง API version ที่ระบุ
//TODO พารามิเตอร์ตัวแรกคือเส้นทางของ API ซึ่งประกอบด้วย `/api/${config.version}/example`
//TODO พารามิเตอร์ตัวที่สองคือ middleware authenticateUser เพื่อตรวจสอบการยืนยันตัวตนก่อนทำการเรียกใช้งาน exampleRouter
router.use(`/api/${config.version}/example`, authenticateUser, exampleRouter);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;