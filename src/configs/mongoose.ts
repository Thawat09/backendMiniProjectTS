//TODO นำเข้า mongoose เพื่อใช้ในการเชื่อมต่อกับ MongoDB
import mongoose from 'mongoose';

//TODO นำเข้าค่า configuration จากไฟล์ app.js
import config from './app';

//TODO ฟังก์ชันเชื่อมต่อกับฐานข้อมูล MongoDB
const connectDB = async () => {
    try {
        const url = config.atlas_url_mongo;

        await mongoose.connect(url);

        console.log('MongoDB is Connected...');
        return mongoose.connection;
    } catch (err) {
        console.error('MongoDB Connected error:', err);
        process.exit(1);
    }
};

//TODO ฟังก์ชันตัดการเชื่อมต่อกับฐานข้อมูล MongoDB
const disconnectDB = async () => {
    try {
        // ตัดการเชื่อมต่อกับ MongoDB
        await mongoose.disconnect();

        console.log('MongoDB is Disconnected...');
    } catch (err) {
        // หากเกิดข้อผิดพลาดในระหว่างการตัดการเชื่อมต่อ แสดงข้อความผิดพลาดและออกจากโปรแกรม
        console.error('MongoDB Disconnected error:', err);
        process.exit(1);
    }
};

//TODO ส่งออกฟังก์ชันเชื่อมต่อและตัดการเชื่อมต่อฐานข้อมูล MongoDB เพื่อให้สามารถนำไปใช้งานได้ในโมดูลอื่น ๆ
export { connectDB, disconnectDB };