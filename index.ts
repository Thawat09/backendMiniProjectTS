import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import log4js from 'log4js';
import config from './src/configs/app'
import routes from './src/routes/index';

// กำหนดการตั้งค่าของ log4js
log4js.configure({
    appenders: {
        defaultFileAppender: { type: 'file', filename: './default.log' }, // บันทึก log ทั่วไป
        errorFileAppender: { type: 'file', filename: './error.log' }, // บันทึก log ที่เกี่ยวกับ error
        consoleAppender: { type: 'console' }
    },
    categories: {
        default: { appenders: ['defaultFileAppender'], level: 'debug' }, // บันทึก log ทั่วไปที่ระดับ debug
        http: { appenders: ['consoleAppender'], level: 'trace' }, // แสดง log เกี่ยวกับ HTTP ที่ระดับ trace ที่ console
        important: { appenders: ['defaultFileAppender', 'consoleAppender'], level: 'error' }, // บันทึก log ที่มีความสำคัญทั้งลงใน default.log และแสดงที่ console ที่ระดับ error
        error: { appenders: ['errorFileAppender'], level: 'error' } // บันทึก log ที่ระดับ error ที่เกี่ยวกับ error.log
    }
});

const app = express();
const port = config.port

// จำกัดการเข้าถึง API ให้ทำได้ไม่เกิน 1000 ครั้งต่อ 5 นาที
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan('combined'));

// เพิ่ม middleware ของ log4js
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

// Routes
app.use('/', routes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});