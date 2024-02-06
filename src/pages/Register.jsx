import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.peeranat.online/api/createUser",
        form
      );
      console.log(response.data);
      navigate("/AdminDashBoard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-0 m-4">
      <h1 className="text-2xl font-bold text-center">สร้างผู้ใช้งาน</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 ">ชื่อผู้ใช้:</span>
          <input
            name="Username"
            onChange={handleChange}
            placeholder="ชื่อผู้ใช้"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700 ">รหัสผ่าน:</span>
          <input
            name="Password"
            onChange={handleChange}
            placeholder="รหัสผ่าน"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>

        <button
          type={handleSubmit}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          ส่งข้อมูล
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
