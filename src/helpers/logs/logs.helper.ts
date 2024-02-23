//TODO นำเข้าชนิดของข้อมูล
import { Request } from 'express';
import log4js from 'log4js'; //? logs

//TODO ฟังก์ชัน Logger ที่ใช้สำหรับการบันทึกข้อมูลและติดตามการทำงานของแอพพลิเคชั่น
const Logger = {
    // ฟังก์ชันสำหรับดึงข้อมูลที่เกี่ยวข้องกับ request ที่ส่งเข้ามา
    getRequestInfo: (req: Request) => {
        return {
            method: req.method, // แสดง HTTP method ที่ใช้
            url: req.originalUrl, // แสดง URL ที่เข้ามา
            basicHeader: req.headers['authorization'], // แสดง header 'authorization'
            bearerHeader: req.headers['bearer-authorization'], // แสดง header 'bearer-authorization'
            userAgent: req.headers['user-agent'], // แสดงข้อมูล user-agent จาก header
            requestBody: req.body, // แสดงข้อมูลที่ส่งมากับ request body
        };
    },

    // ฟังก์ชันสำหรับบันทึกข้อความในระดับ Trace
    logTrace: (message: string, req: Request) => {
        const traceLogger = log4js.getLogger('trace'); // กำหนด logger สำหรับระดับ trace
        const requestInfo = Logger.getRequestInfo(req); // ดึงข้อมูล request
        const text = `${message} ${JSON.stringify(requestInfo)}`; // สร้างข้อความ log
        traceLogger.trace(text); // บันทึก log ในระดับ trace
    },

    // ฟังก์ชันสำหรับบันทึกข้อความในระดับ Debug
    logDebug: (message: string, req: Request) => {
        const debugLogger = log4js.getLogger('debug'); // กำหนด logger สำหรับระดับ debug
        const requestInfo = Logger.getRequestInfo(req); // ดึงข้อมูล request
        const text = `${message} ${JSON.stringify(requestInfo)}`; // สร้างข้อความ log
        debugLogger.debug(text); // บันทึก log ในระดับ debug
    },

    // ฟังก์ชันสำหรับบันทึกข้อความในระดับ Info
    logInfo: (message: string, req: Request) => {
        const infoLogger = log4js.getLogger('info'); // กำหนด logger สำหรับระดับ info
        const requestInfo = Logger.getRequestInfo(req); // ดึงข้อมูล request
        const text = `${message} ${JSON.stringify(requestInfo)}`; // สร้างข้อความ log
        infoLogger.info(text); // บันทึก log ในระดับ info
    },

    // ฟังก์ชันสำหรับบันทึกข้อความในระดับ Warning
    logWarn: (message: string, req: Request) => {
        const warnLogger = log4js.getLogger('warn'); // กำหนด logger สำหรับระดับ warn
        const requestInfo = Logger.getRequestInfo(req); // ดึงข้อมูล request
        const text = `${message} ${JSON.stringify(requestInfo)}`; // สร้างข้อความ log
        warnLogger.warn(text); // บันทึก log ในระดับ warn
    },

    // ฟังก์ชันสำหรับบันทึกข้อความในระดับ Error
    logError: (message: string, req: Request) => {
        const errorLogger = log4js.getLogger('error'); // กำหนด logger สำหรับระดับ error
        const requestInfo = Logger.getRequestInfo(req); // ดึงข้อมูล request
        const text = `${message} ${JSON.stringify(requestInfo)}`; // สร้างข้อความ log
        errorLogger.error(text); // บันทึก log ในระดับ error
    }
};

//TODO ส่งออก Logger เพื่อให้ module อื่นสามารถ import ได้
export default Logger;