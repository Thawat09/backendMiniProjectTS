// นำเข้า passport จากโมดูล passport
import passport from 'passport';

// นำเข้า Strategy ของ local authentication จากโมดูล passport-local
import { Strategy as LocalStrategy } from 'passport-local';

// นำเข้าข้อมูลผู้ใช้งาน (ในที่นี้คือ users) จากไฟล์ users
import { users } from './users';

// กำหนดการใช้งานของ LocalStrategy โดยระบุ usernameField เป็น 'email' และ passwordField เป็น 'password'
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    // ฟังก์ชัน callback ที่ใช้ในการตรวจสอบการยืนยันตัวตน
    (email: string, password: string, done: any) => {
        // ค้นหาผู้ใช้ใน users ที่มี email และ password ตรงกับที่รับมา
        const user = users.find((u) => u.email === email && u.password === password);
        // ถ้าไม่พบผู้ใช้
        if (!user) {
            // ส่งข้อความข้อผิดพลาดกลับไป
            return done(null, false, { message: 'Incorrect email or password' });
        }
        // หากพบผู้ใช้ ส่งข้อมูลของผู้ใช้ไปยัง callback ต่อไป
        return done(null, user);
    }
));