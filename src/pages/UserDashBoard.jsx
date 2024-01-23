import React from "react";
import Header from '../components/Header'
import DashBoard from '../components/bodyDashBoard'
import { useNavigate } from 'react-router-dom';

function UserDashBoard() {
    const navigate = useNavigate();

    useEffect(() => {
        // ดึงข้อมูลบทบาทจาก local storage หรือ context ตามที่คุณต้องการ
        const userRole = localStorage.getItem('userRole');

        // ตรวจสอบสิทธิ์ user
        if (userRole !== 'user') {
            // ถ้าไม่มีสิทธิ์ให้ Redirect ไปที่หน้าที่เหมาะสม
            navigate('/access-denied');
        }
    }, [navigate]);

  return (
    <>
    <Header></Header>
    <DashBoard></DashBoard>
    </>
  )
}

export default UserDashBoard;
