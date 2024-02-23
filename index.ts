//TODO นำเข้าโมดูล
import express from 'express'; //? express เพื่อใช้ในการสร้างและกำหนดค่าแอปพลิเคชัน
import helmet from 'helmet'; //? helmet เพื่อเพิ่มความปลอดภัยให้กับแอปพลิเคชัน
import cors from 'cors'; //? เพื่อเปิดใช้งาน Cross-Origin Resource Sharing (CORS)
import rateLimit from 'express-rate-limit'; //? express-rate-limit เพื่อจำกัดการเข้าถึง API
import morgan from 'morgan'; //? morgan เพื่อบันทึกการเข้าถึงแอปพลิเคชัน
import log4js from 'log4js'; //? log4js เพื่อจัดการการบันทึก log
import bodyParser from 'body-parser'; //? body-parser เพื่อใช้ในการแปลงข้อมูลร้องขอ HTTP ให้เป็น JSON

//TODO นำเข้าเส้นทาง
import config from './src/configs/app'; //? เส้นทาง configuration จากไฟล์ configs/app.js
import routes from './src/routes/index'; //? เส้นทางของแอปพลิเคชัน

//TODO กำหนดการตั้งค่าของ log4js เพื่อให้แอปพลิเคชันทำการบันทึก log ตามที่กำหนด
log4js.configure({
    appenders: {
        default: { type: 'file', filename: 'log/default.log' },
        traceFileAppender: { type: 'file', filename: 'log/trace.log' }, // บันทึก log ระดับ trace ไปยังไฟล์ trace.log
        debugFileAppender: { type: 'file', filename: 'log/debug.log' }, // บันทึก log ระดับ debug ไปยังไฟล์ debug.log
        infoFileAppender: { type: 'file', filename: 'log/info.log' }, // บันทึก log ระดับ info ไปยังไฟล์ info.log
        warnFileAppender: { type: 'file', filename: 'log/warn.log' }, // บันทึก log ระดับ warn ไปยังไฟล์ warn.log
        errorFileAppender: { type: 'file', filename: 'log/error.log' }, // บันทึก log ระดับ error ไปยังไฟล์ error.log
        console: { type: 'console' } // แสดง log ทุกระดับที่ console
    },
    categories: {
        default: { appenders: ['default', 'console'], level: 'all' },
        trace: { appenders: ['traceFileAppender'], level: 'trace' }, // log ระดับ trace
        debug: { appenders: ['debugFileAppender'], level: 'debug' }, // log ระดับ debug
        info: { appenders: ['infoFileAppender'], level: 'info' }, // log ระดับ info
        warn: { appenders: ['warnFileAppender'], level: 'warn' }, // log ระดับ warn
        error: { appenders: ['errorFileAppender'], level: 'error' } // log ระดับ error
    }
});

//TODO สร้างอินสแตนซ์ของแอปพลิเคชัน Express
const app = express();
const port = config.port;

//TODO สร้าง Logger
const logger = log4js.getLogger();

//TODO จำกัดการเข้าถึง API ให้ทำได้ไม่เกิน 1000 ครั้งต่อ 5 นาที
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, //! 5 นาที
    max: 1000
});

//TODO Middleware
app.use(bodyParser.json()); //? เปิดใช้งาน bodyParser เพื่อแปลงข้อมูลร้องขอ HTTP เป็น JSON
app.use(helmet()); //? เพิ่มความปลอดภัยให้กับแอปพลิเคชัน
app.use(cors()); //? เปิดใช้งาน Cross-Origin Resource Sharing (CORS)
app.use(limiter); //? จำกัดการเข้าถึง API
app.use(morgan('combined')); //? บันทึกการเข้าถึงแอปพลิเคชัน

//TODO เพิ่ม middleware ของ log4js เพื่อบันทึก log ของแอปพลิเคชัน
app.use(log4js.connectLogger(logger, { level: 'auto' }));

//TODO Routes
app.use('/', routes); //? เรียกใช้งานเส้นทางของแอปพลิเคชัน

//TODO เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});