// นำเข้า mongoose เพื่อใช้ในการเชื่อมต่อกับ MongoDB
import mongoose from 'mongoose';

// ฟังก์ชันเชื่อมต่อกับฐานข้อมูล MongoDB
const connectDB = async () => {
    try {
        // URI สำหรับเชื่อมต่อกับ MongoDB
        const uri = 'mongodb://localhost:27017/ชื่อฐานข้อมูล';

        // เชื่อมต่อกับ MongoDB โดยใช้ URI
        await mongoose.connect(uri);
        console.log('MongoDB is Connected...');
    } catch (err) {
        // หากเกิดข้อผิดพลาดในระหว่างการเชื่อมต่อ แสดงข้อความผิดพลาดและออกจากโปรแกรม
        console.error(err.message);
        process.exit(1);
    }
};

// ฟังก์ชันตัดการเชื่อมต่อกับฐานข้อมูล MongoDB
const disconnectDB = async () => {
    try {
        // ตัดการเชื่อมต่อกับ MongoDB
        await mongoose.disconnect();
        console.log('MongoDB is Disconnected...');
    } catch (err) {
        // หากเกิดข้อผิดพลาดในระหว่างการตัดการเชื่อมต่อ แสดงข้อความผิดพลาดและออกจากโปรแกรม
        console.error(err.message);
        process.exit(1);
    }
};

// ส่งออกฟังก์ชันเชื่อมต่อและตัดการเชื่อมต่อฐานข้อมูล MongoDB เพื่อให้สามารถนำไปใช้งานได้ในโมดูลอื่น ๆ
export { connectDB, disconnectDB };