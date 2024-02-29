//TODO นำเข้าชนิดของข้อมูล
import { Request, Response } from 'express'; // นำเข้าชนิดของข้อมูล Request และ Response จาก Express framework

//TODO นำเข้าฟังก์ชัน
import { validationResult } from 'express-validator'; // นำเข้าฟังก์ชัน validationResult จาก express-validator เพื่อตรวจสอบความถูกต้องของข้อมูล

//TODO นำเข้าเส้นทาง
import redisHelper from '../../helpers/redis/redis.helper'

//TODO ฟังก์ชัน indexController ที่จะใช้ในการควบคุมการทำงานของเส้นทาง
export const getAll = async (req: Request, res: Response) => {
    // ตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมากับคำขอ
    const errors = validationResult(req);

    // หากมีข้อผิดพลาด
    if (!errors.isEmpty()) {
        // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อผิดพลาดทั้งหมด
        return res.status(400).json({ errors: errors.array() });
    }

    const key: string = req.body.key;

    try {
        const keys = await redisHelper.getPetternKeys(key);

        res.status(200).json({ data: keys });
    } catch (err) {
        res.status(500).json({ error: 'Error accessing Redis' });
    }
}

export const getKey = async (req: Request, res: Response) => {
    // ตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมากับคำขอ
    const errors = validationResult(req);

    // หากมีข้อผิดพลาด
    if (!errors.isEmpty()) {
        // ส่งคำตอบกลับด้วยสถานะ 400 (Bad Request) พร้อมกับข้อผิดพลาดทั้งหมด
        return res.status(400).json({ errors: errors.array() });
    }

    const key: string = req.body.key;

    try {
        const keys = await redisHelper.get(key);

        res.status(200).json({ data: keys });
    } catch (err) {
        res.status(500).json({ error: 'Error accessing Redis' });
    }
}

//TODO ส่งออกฟังก์ชัน indexController เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
export default { getAll, getKey };