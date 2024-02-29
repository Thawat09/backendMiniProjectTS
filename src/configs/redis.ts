import { createClient } from 'redis';
import config from './app';

const redisOptions = {
    url: `redis://${config.redis_host}:${config.redis_port}`,
    password: config.redis_pass,
};

// สร้าง redisClient โดยใช้ createClient() พร้อมส่ง redisOptions เข้าไป
const redisClient = createClient(redisOptions);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// อาจจะต้องเรียก connect() เพื่อเริ่มการเชื่อมต่อ
redisClient.connect();

export default redisClient;