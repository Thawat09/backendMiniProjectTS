//TODO นำเข้าชนิดของข้อมูล
import { Request, Response } from 'express'; // นำเข้าชนิดของข้อมูล Request และ Response จาก Express framework

//TODO นำเข้าฟังก์ชัน
import { validationResult } from 'express-validator'; // นำเข้าฟังก์ชัน validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

//TODO การนำเข้าเส้นทาง
import ExampleModel from '../../models/example/example.model';

//TODO ฟังก์ชัน indexController ที่จะใช้ในการควบคุมการทำงานของเส้นทาง
export const indexController = (req: Request, res: Response) => {
    // ตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมากับคำขอ
    const errors = validationResult(req);

    // หากมีข้อผิดพลาด
    if (!errors.isEmpty()) {
        // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อผิดพลาดทั้งหมด
        return res.status(400).json({ errors: errors.array() });
    }

    // หากไม่มีข้อผิดพลาด ส่งคำตอบกลับด้วยข้อความ "Hello, TypeScript Express!"
    return res.send(`Hello ${req.method}, TypeScript Express!`);
};

//TODO ฟังก์ชัน otherController ที่จะใช้ในการดึงข้อมูลจากฐานข้อมูล
export const otherController = async (req: Request, res: Response) => {
    try {
        // ดึงข้อมูลตัวอย่างทั้งหมดจากฐานข้อมูล
        const examples = await ExampleModel.findAll();
        // ส่งข้อมูลกลับเป็น JSON
        return res.json(examples);
    } catch (error) {
        // หากเกิดข้อผิดพลาดในระหว่างดึงข้อมูล
        console.error(error);
        // ส่งคำตอบกลับด้วยสถานะ 500 (Internal Server Error) พร้อมกับข้อความแสดงข้อผิดพลาด
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//TODO ส่งออกฟังก์ชัน indexController เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
export default { indexController, otherController };