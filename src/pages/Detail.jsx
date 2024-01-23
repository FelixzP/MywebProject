import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.38:5000/api/supportForms');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4 bg-black text-white min-h-screen p-5"> {/* ตกแต่งพื้นหลังสีดำและข้อความสีขาว */}
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      {data.map((item) => (
        <div key={item.id} className="p-4 border border-gray-300 rounded bg-white text-black"> {/* ตกแต่งพื้นหลังสีขาวและข้อความสีดำ */}
          <p>ประเภทงาน: {item.JobType}</p>
          <p>สถานที่: {item.Location}</p>
          <p>ฝ่ายงาน: {item.Department}</p>
          <p>ปัญหา: {item.Issue}</p>
          <p>เบอร์ติดต่อ: {item.ContactNumber}</p>
          <p>หมายเหตุ: {item.Note}</p>
          <p>สถานะ: {item.Status}</p>
        </div>
      ))}
    </div>
  );
}

export default Detail;
