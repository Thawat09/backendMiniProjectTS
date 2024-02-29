//TODO นำเข้าคลาส 
import { Router } from 'express'; //? Router จาก Express framework

//TODO นำเข้าโมดูล
import config from '../configs/app'; //? นำเข้าการตั้งค่าจากโมดูล 'config'
import exampleRouter from './example/example.index'; //? นำเข้าโมดูลของ example เพื่อจัดการเส้นทาง
import tokenRouter from './token/token.index'; //? นำเข้าโมดูลของ token เพื่อจัดการเส้นทาง
import redisRouter from './redis/redis.index'; //? นำเข้าโมดูลของ token เพื่อจัดการเส้นทาง

//TODO นำเข้าฟังก์ชัน
import { authenticateUser } from '../auth/authenticateUser'; //? นำเข้าฟังก์ชัน authenticateUser จากไฟล์ authenticateUser ในโฟลเดอร์ auth
import { checkToken } from '../auth/checkToken';  //? นำเข้าฟังก์ชัน checkToken จากไฟล์ checkToken ในโฟลเดอร์ auth

//TODO สร้างอินสแตนซ์ใหม่ของคลาส Router
const router = Router();

//TODO พารามิเตอร์ตัวแรกคือเส้นทางของ API ซึ่งประกอบด้วย `/api/${config.version}/example`
//TODO พารามิเตอร์ตัวที่สองคือ middleware authenticateUser เพื่อตรวจสอบการยืนยันตัวตนก่อนทำการเรียกใช้งาน exampleRouter
//TODO ติดตั้ง exampleRouter ภายใต้เส้นทาง API version ที่ระบุ
router.use(`/api/${config.version}/example`, authenticateUser, checkToken, exampleRouter);

//TODO ติดตั้ง tokenRouter ภายใต้เส้นทาง API version ที่ระบุ
router.use(`/api/${config.version}/token`, authenticateUser, tokenRouter);

//TODO ติดตั้ง redisRouter ภายใต้เส้นทาง API version ที่ระบุ
router.use(`/api/${config.version}/redis`, authenticateUser, checkToken, redisRouter);

//TODO ส่งออกอินสแตนซ์ของ router เพื่อให้ใช้งานในส่วนอื่นของแอปพลิเคชัน
export default router;