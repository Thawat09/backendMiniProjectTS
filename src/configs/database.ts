//TODO นำเข้าคลาส Sequelize จากโมดูล sequelize
import { Sequelize } from 'sequelize';

//TODO นำเข้าค่า configuration จากไฟล์ app.js
import config from './app';

//TODO สร้างอินสแตนซ์ Sequelize โดยกำหนดค่าการเชื่อมต่อฐานข้อมูล
const sequelize = new Sequelize({
    dialect: 'postgres', //? กำหนดเป็น PostgreSQL
    host: config.pgsql_host, //? ใช้ค่า host จาก configuration
    port: Number(config.pgsql_port), //? ใช้ค่า port และแปลงเป็นตัวเลขจาก configuration
    username: config.pgsql_user, //? ใช้ชื่อผู้ใช้จาก configuration
    password: config.pgsql_pass, //? ใช้รหัสผ่านจาก configuration
    database: config.pgsql_db, //? ใช้ชื่อฐานข้อมูลจาก configuration
});

//TODO ทำการตรวจสอบความถูกต้องของการเชื่อมต่อฐานข้อมูล
sequelize.authenticate()
    .then(() => {
        console.log('Connection to PostgreSQL database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

//TODO ส่งออกอินสแตนซ์ Sequelize เพื่อให้สามารถนำไปใช้ในโมดูลอื่น ๆ ได้
export default sequelize;