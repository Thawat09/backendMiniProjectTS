const redisClient: any = require('../../configs/redis').default;

const methods = {
    // สร้างฟังก์ชันเพื่อดึงข้อมูลจาก Redis ตามรูปแบบที่กำหนด
    getPetternKeys: async (key: string) => {
        try {
            const keys = await redisClient.keys(key);

            return keys;
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    },

    // ฟังก์ชันสำหรับเรียกข้อมูลจาก Redis ตามคีย์
    get: async (key: string) => {
        try {
            const data = await redisClient.get(key);

            return data;
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    },

    // ฟังก์ชันสำหรับเซ็ตข้อมูลใน Redis
    set: async (key: string, value: string) => {
        try {
            await redisClient.set(key, value);
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    },

    // ฟังก์ชันสำหรับลบข้อมูลจาก Redis
    delete: async (key: string) => {
        try {
            await redisClient.del(key);
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    },

    // ฟังก์ชันสำหรับเพิ่มค่าของคีย์ใน Redis (Increment)
    incr: async (key: string) => {
        try {
            const incrementedValue = await redisClient.incr(key);

            return incrementedValue;
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    },

    // ฟังก์ชันสำหรับลดค่าของคีย์ใน Redis (Decrement)
    decr: async (key: string) => {
        try {
            const decrementedValue = await redisClient.decr(key);

            return decrementedValue;
        } catch (error) {
            throw new Error('Error accessing Redis');
        }
    }
};

export default methods;