import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT;

// จำกัดการเข้าถึง API ให้ทำได้ไม่เกิน 100 ครั้งต่อ 15 นาที
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan('combined'));

// Routes
app.get('/', [], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Hello, TypeScript Express!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});