import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const currentYear = new Date().getFullYear();

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.peeranat.online/login', {
        username: form.username,
        password: form.password,

      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful. Token:', token); // แสดง role ที่ได้รับ  

      navigate('/AdminDashBoard'); // ส่งไปยังหน้า admin
    } catch (error) {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };
  


  return (
    <>
      <div className="flex flex-col item-center justify-center h-screen bg-gradient-to-r from-LoginF via-LoginC to-LoginS background-animate">
        <div className="backdrop-blur-xl rounded-2xl items-center justify-center w-11/12 md:w-2/4 lg:w-2/4 xl:w-2/4 2xl:w-4/12 mx-auto">
          <div className="relative">
            <form onSubmit={handleSubmit} className="p-5 relative z-20 space-y-6">
              <h1 className="text-center text-3xl font-bold text-Text">LOGIN</h1>
              <label className="flex flex-col">
                <span className="text-Text">ชื่อผู้ใช้</span>
                <input
                  name="username"
                  onChange={handleChange}
                  placeholder="username"
                  className="max-w-full p-2 border border-gray-300 rounded items-center"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-Text">รหัสผ่าน</span>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="password"
                  className="max-w-full p-2 border border-gray-300 rounded items-center"
                />
              </label>
              <button
                type="submit"
                className="flex justify-center w-11/12 py-2 px-4 mx-auto rounded-xl bg-Primary text-Text hover:bg-Secondary background-animate"
              >
                ล็อกอิน
              </button>
              <div className="text-center text-Text">
                &copy;{currentYear} htc.ac.th. All rights reserved.
              </div>
            </form>
            <div className="absolute -inset-1 rounded-md blur-md bg-gray-400/40 z-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
