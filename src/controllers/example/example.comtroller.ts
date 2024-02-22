//TODO นำเข้าชนิดของข้อมูล
import { Request, Response } from 'express'; //? Request และ Response จาก Express framework

//TODO นำเข้าฟังก์ชัน
import { validationResult } from 'express-validator'; //? validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

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
    res.send(`Hello ${req.method}, TypeScript Express!`);
};

export const otherController = (req: Request, res: Response) => {
    // การดำเนินการของฟังก์ชันอื่น ๆ ที่ต้องการ
};

//TODO ส่งออกฟังก์ชัน indexController เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
export default { indexController, otherController };