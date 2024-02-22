//TODO นำเข้าคลาส Model และ DataTypes จาก sequelize
import { Model, DataTypes } from 'sequelize';

//TODO นำเข้าอินสแตนซ์ sequelize ที่เรากำหนดการเชื่อมต่อไว้กับฐานข้อมูล
import sequelize from '../../configs/database';

//TODO สร้างคลาส ExampleModel โดยสืบทอดคุณสมบัติจากคลาส Model ของ Sequelize
class ExampleModel extends Model { }

//TODO กำหนดโครงสร้างของตาราง ExampleModel ซึ่งประกอบด้วยคอลัมน์ต่าง ๆ
ExampleModel.init(
    {
        // กำหนดคอลัมน์ id โดยมีชนิดข้อมูลเป็น INTEGER และเป็น Primary Key ที่ Auto Increment
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // กำหนดคอลัมน์ name โดยมีชนิดข้อมูลเป็น STRING
        name: {
            type: DataTypes.STRING,
        },
        // กำหนดคอลัมน์ description โดยมีชนิดข้อมูลเป็น STRING
        description: {
            type: DataTypes.STRING,
        },
        // กำหนดคอลัมน์ price โดยมีชนิดข้อมูลเป็น FLOAT
        price: {
            type: DataTypes.FLOAT,
        },
        // กำหนดคอลัมน์ category โดยมีชนิดข้อมูลเป็น STRING
        category: {
            type: DataTypes.STRING,
        },
        // กำหนดคอลัมน์ created_at โดยมีชนิดข้อมูลเป็น DATE และไม่อนุญาตให้เป็นค่าว่าง
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        // กำหนดคอลัมน์ updated_at โดยมีชนิดข้อมูลเป็น DATE และไม่อนุญาตให้เป็นค่าว่าง
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // กำหนดการเชื่อมต่อฐานข้อมูล
        modelName: 'example', // ระบุชื่อโมเดลให้ตรงกับชื่อของตาราง
        tableName: 'example', // ระบุชื่อตารางที่ต้องการใช้
        schema: 'public', // ระบุ schema ถ้ามี
        timestamps: false, // ปิดการเพิ่มคอลัมน์ "createdAt" และ "updatedAt"
    }
);

//TODO ส่งออกโมเดล ExampleModel เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของแอปพลิเคชันได้
export default ExampleModel;