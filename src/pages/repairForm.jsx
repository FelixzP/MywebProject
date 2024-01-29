import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RepairForm = () => {
  const [form, setForm] = useState({
    jobType: "",
    location: "",
    department: "",
    issue: "",
    contactNumber: "",
    note: "",
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
        "https://api.peeranat.online/api/supportForms",
        form
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-0 m-4">
      <h1 className="text-2xl font-bold text-center">
        แจ้งปัญหาการใช้งานคอมพิวเตอร์ และระบบเครือข่าย
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 ">ชื่อผู้แจ้ง:</span>
          <input
            name="name"
            onChange={handleChange}
            placeholder="ชื่อผู้แจ้ง"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700 ">ประเภทงาน:</span>
          <select
            name="JobType"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="">ประเภทงาน</option>
            <option value="เครื่องคอมพิวเตอร์">เครื่องคอมพิวเตอร์</option>
            <option value="ระบบเครือข่าย/อินเทอร์เน็ต">
              ระบบเครือข่าย/อินเทอร์เน็ต
            </option>
            <option value="ระบบโทรศัพท์">ระบบโทรศัพท์</option>
            <option value="เครื่องพิมพ์/ปริ้นเตอร์">
              เครื่องพิมพ์/ปริ้นเตอร์
            </option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">
            สถานที่ในการแจ้งซ่อม(เช่น อาคาร 2):
          </span>
          <input
            name="location"
            onChange={handleChange}
            placeholder="สถานที่ในการแจ้งซ่อม"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">3.ฝ่ายงานของผู้แจ้งปัญหา(เฉพาะฝ่ายงาน ถ้าเป็นภาควิชาให้เว้น แล้วตอบข้อถัดไป) :</span>
          <select
            name="Department"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">เลือกฝ่ายงาน</option>
            <option value="ผู้บริหาร">ผู้บริหาร</option>
            <option value="งานบริหารงานทั่วไป">งานบริหารงานทั่วไป</option>
            <option value="งานบุคลากร">งานบุคลากร</option>
            <option value="งานการเงิน">งานการเงิน</option>
            <option value="งานบัญชี">งานบัญชี</option>
            <option value="งานพัสดุ">งานพัสดุ</option>
            <option value="งานอาคารสถานที่">งานอาคารสถานที่</option>
            <option value="งานทะเบียน">งานทะเบียน</option>
            <option value="งานประชาสัมพันธ์">งานประชาสัมพันธ์</option>
            <option value="งานพัฒนาหลักสูตรการเรียน การสอน">
              งานพัฒนาหลักสูตรการเรียน การสอน
            </option>
            <option value="งานวัดผลและประเมินผล">งานวัดผลและประเมินผล</option>
            <option value="งานวิทยาบริการและห้องสมุด">
              งานวิทยาบริการและห้องสมุด
            </option>
            <option value="งานอาชีวศึกษาและระบบทวิภาคี">
              งานอาชีวศึกษาและระบบทวิภาคี
            </option>
            <option value="งานสื่อการเรียนการสอน">งานสื่อการเรียนการสอน</option>
            <option value="งานกิจกรรมนักเรียนนักศึกษา">
              งานกิจกรรมนักเรียนนักศึกษา
            </option>
            <option value="งานครูที่ปรึกษา">งานครูที่ปรึกษา</option>
            <option value="งานปกครอง">งานปกครอง</option>
            <option value="งานแนะแนวอาชีพและจัดหางาน">
              งานแนะแนวอาชีพและจัดหางาน
            </option>
            <option value="งานสวัสดิการนักเรียน นักศึกษา">
              งานสวัสดิการนักเรียน นักศึกษา
            </option>
            <option value="งานโครงการพิเศษและการบริการชุมชน">
              งานโครงการพิเศษและการบริการชุมชน
            </option>
            <option value="งานวางแผนและงบประมาณ">งานวางแผนและงบประมาณ</option>
            <option value="งานศูนย์ข้อมูลสารสนเทศ">
              งานศูนย์ข้อมูลสารสนเทศ
            </option>
            <option value="งานความร่วมมือ">งานความร่วมมือ</option>
            <option value="งานส่งเสริมผลิตผลการค้า และประกอบธุรกิจ">
              งานส่งเสริมผลิตผลการค้า และประกอบธุรกิจ
            </option>
            <option value="งานประกันคุณภาพและมาตรฐานการศึกษา">
              งานประกันคุณภาพและมาตรฐานการศึกษา
            </option>
            <option value="งานวิจัยงานพัฒนานวัตกรรมและสิ่งประดิษฐ์">
              งานวิจัยงานพัฒนานวัตกรรมและสิ่งประดิษฐ์
            </option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">4.ภาควิชาของผู้แจ้งปัญหา:</span>
          <select
            name="Department"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">เลือกภาควิชา</option>
            <option value="ภาควิชาอุตสาหกรรม">ภาควิชาอุตสาหกรรม</option>
            <option value="ภาควิชาเทคนิคเครื่องกล">
              ภาควิชาเทคนิคเครื่องกล
            </option>
            <option value="ภาควิชาช่างกลโรงงาน">ภาควิชาช่างกลโรงงาน</option>
            <option value="ภาควิชาเทคนิคการเชื่อมและการผลิต">
              ภาควิชาเทคนิคการเชื่อมและการผลิต
            </option>
            <option value="ภาควิชาช่างไฟฟ้ากำลัง">ภาควิชาช่างไฟฟ้ากำลัง</option>
            <option value="ภาควิชาอิเล็กทรอนิกส์">ภาควิชาอิเล็กทรอนิกส์</option>
            <option value="ภาควิชาช่างก่อสร้างและโยธา">
              ภาควิชาช่างก่อสร้างและโยธา
            </option>
            <option value="ภาควิชาสถาปัตยกรรม">ภาควิชาสถาปัตยกรรม</option>
            <option value="ภาควิชาเทคโนโลยีสารสนเทศและการสื่อสาร">
              ภาควิชาเทคโนโลยีสารสนเทศและการสื่อสาร
            </option>
            <option value="ภาควิชาเทคโนโลยีเครื่องวัดและควบคุมงานปิโตรเลียม">
              ภาควิชาเทคโนโลยีเครื่องวัดและควบคุมงานปิโตรเลียม
            </option>
            <option value="ภาควิชาเทคนิคพลังงาน">ภาควิชาเทคนิคพลังงาน</option>
            <option value="ภาควิชาช่างเทคนิคพื้นฐาน">
              ภาควิชาช่างเทคนิคพื้นฐาน
            </option>
            <option value="ภาควิชาสามัญสัมพันธ์">ภาควิชาสามัญสัมพันธ์</option>
            <option value="ภาควิชาช่างเครื่องเรือนและตกแต่งภายใน">
              ภาควิชาช่างเครื่องเรือนและตกแต่งภายใน
            </option>
            <option value="ภาควิชาช่างสำรวจ">ภาควิชาช่างสำรวจ</option>
            <option value="ภาควิชาช่างเครื่องปรับอากาศและทำความเย็น">
              ภาควิชาช่างเครื่องปรับอากาศและทำความเย็น
            </option>
            <option value="ภาควิชาช่างก่อสร้าง">ภาควิชาช่างก่อสร้าง</option>
            <option value="ภาควิชาการจัดการโลจิสติกส์">
              ภาควิชาการจัดการโลจิสติกส์
            </option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">ปัญหาการใช้งาน:</span>
          <input
            name="issue"
            onChange={handleChange}
            placeholder="ปัญหาการใช้งาน"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">เบอร์ติดต่อกลับของผู้แจ้งปัญหา:</span>
          <input
            name="contactNumber"
            maxLength="10"
            type="tel"
            onChange={handleChange}
            placeholder="เบอร์ติดต่อกลับของผู้แจ้งปัญหา"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">หมายเหตุ:</span>
          <input
            name="note"
            onChange={handleChange}
            placeholder="หมายเหตุ"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          ส่งข้อมูล
        </button>
      </form>
    </div>
  );
};

export default RepairForm;
