//TODO นำเข้าชนิดของข้อมูล
import { Request, Response } from 'express'; //? นำเข้าชนิดของข้อมูล Request และ Response จาก Express framework
import log4js, { Logger } from 'log4js'; //? logs

//TODO นำเข้าฟังก์ชัน
import { validationResult } from 'express-validator'; //? นำเข้าฟังก์ชัน validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

//TODO การนำเข้าเส้นทาง
// import ExampleModel from '../../models/example/example.model';

//TODO นำเข้า logger จาก log4js
const logger: Logger = log4js.getLogger('trace');

//TODO ฟังก์ชัน genToken ที่จะใช้ในการควบคุมการทำงานของเส้นทาง
export const genToken = (req: Request, res: Response) => {
    // ตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมากับคำขอ
    const errors = validationResult(req);
    // logger.level = 'info'; 
    console.log(logger);
    logger.trace('This is a trace message');

    // หากมีข้อผิดพลาด
    if (!errors.isEmpty()) {
        // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อผิดพลาดทั้งหมด
        return res.status(400).json({ errors: errors.array() });
    }

    // หากไม่มีข้อผิดพลาด ส่งคำตอบกลับด้วยข้อความ "Hello, TypeScript Express!"
    res.send(`Get ${req.method}, TypeScript Express!`);
};

//TODO ส่งออกฟังก์ชัน genToken เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
export default { genToken };