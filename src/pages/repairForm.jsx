import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RepairForm = () => {
  const [form, setForm] = useState({
    jobType: '',
    location: '',
    department: '',
    issue: '',
    contactNumber: '',
    note: ''
  });
 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.peeranat.online/api/supportForms', form);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-0 m-4">
      <h1 className="text-2xl font-bold text-center">แจ้งปัญหาการใช้งานคอมพิวเตอร์ และระบบเครือข่าย</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
      <span className="text-gray-700 ">ชื่อผู้แจ้ง:</span>
      <input name="name" onChange={handleChange} placeholder="ชื่อผู้แจ้ง" className="w-full p-2 border border-gray-300 rounded" />
      </label>        
        <label className="block">
          <span className="text-gray-700">ประเภทงานที่ต้องการซ่อม:</span>
          <input name="jobType" onChange={handleChange} placeholder="ประเภทงานที่ต้องการซ่อม" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-gray-700">สถานที่ในการแจ้งซ่อม:</span>
          <input name="location" onChange={handleChange} placeholder="สถานที่ในการแจ้งซ่อม" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-gray-700">ฝ่ายงานของผู้แจ้งปัญหา:</span>
          <input name="department" onChange={handleChange} placeholder="ฝ่ายงานของผู้แจ้งปัญหา" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-gray-700">ปัญหาการใช้งาน:</span>
          <input name="issue" onChange={handleChange} placeholder="ปัญหาการใช้งาน" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-gray-700">เบอร์ติดต่อกลับของผู้แจ้งปัญหา:</span>
          <input name="contactNumber" onChange={handleChange} placeholder="เบอร์ติดต่อกลับของผู้แจ้งปัญหา" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-gray-700">หมายเหตุ:</span>
          <input name="note" onChange={handleChange} placeholder="หมายเหตุ" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">ส่งข้อมูล</button>
      </form>
    </div>
  );
};

export default RepairForm;
