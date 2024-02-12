import React, { useState, useEffect } from "react";
import axios from "axios";
import _, { values } from "lodash"; // นำเข้า lodash
import Modal from "react-modal";
import DashQuerry from "./DashQuerry";
import { jwtDecode } from "jwt-decode";
function AdminDB() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ดึงข้อมูลผู้แก้ไขจาก Local Storage
  const Token = localStorage.getItem("token");
  const admin = jwtDecode(Token);

  const [form, setForm] = useState({
    Status: "",
    Admin: ""
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
      const response = await axios.patch(
        `https://api.peeranat.online/api/updateStatus/${selectedRow.ID}`, // ปรับ URL ตาม API ของคุณ
        form
      );
      console.log(response.data);
      handleEditModalClose();

      fetchData();
     
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
  fetchData();
}, []);

  
  const fetchData = () => {
    axios
      .get("https://api.peeranat.online/api/supportForms")
      .then((response) => {
        console.log(response);
        setData(_.chunk(response.data, rowsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  
  const rowsPerPage = 5; // จำนวนแถวต่อหน้า

  useEffect(() => {
    axios
      .get("https://api.peeranat.online/api/supportForms") // API
      .then((response) => {
        console.log(response);
        setData(_.chunk(response.data, rowsPerPage)); // แบ่งข้อมูลออกเป็นชุดของแถว
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedRow(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateData = () => {
    
    handleEditModalClose();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-Text">รายการคิว</h1>
      <table className="min-w-full border-separate border-spacing-y-4 divide-y backdrop-blur rounded-xl text-Text">
        <thead>
          <tr className="bg-transparent rounded-xl">
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center rounded-l-xl">
              ลำดับ
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center ">
              ประเภทงานที่ต้องการซ่อม
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center ">
              สถานที่ในการแจ้งซ่อม
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center ">
              ฝ่ายงานของผู้แจ้งปัญหา
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center ">
              ปัญหาการใช้งาน
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center">
              รับเรื่อง
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center rounded-r-xl"></th>
          </tr>
          {data[page]?.map((row) => (
            <tr
              key={row.ID}
              className="flex lg:table-row md:rounded-xl border-separate border-spacing-y-4 flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static lg:rounded-l-xl">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase ">
                  ลำดับ
                </span>

                <p className="px-4 py-2">{row.ID}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase ">
                  ประเภทงานที่ต้องการซ่อม
                </span>

                <p className="px-4 py-2">{row.JobType}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl teYYxt-Text px-2 py-1 text-xs font-bold uppercase">
                  สถานที่ในการแจ้งซ่อม
                </span>

                <p className="px-4 py-2">{row.Location}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  ฝ่ายงานของผู้แจ้งปัญหา
                </span>

                <p className="px-4 py-2">{row.Department}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur  bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  ปัญหาการใช้งาน
                </span>

                <p className="px-4 py-2 truncate">{row.Issue}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  รับเรื่อง
                </span>
                <p
                  className={`px-4 py-2 ${
                    row.OtherStatus
                      ? "text-Accent"
                      : row.Status === "กำลังดำเนินการติดตาม"
                      ? "text-Text bg-Wait rounded-xl"
                      : row.Status === "ยังไม่ได้รับเรื่อง"
                      ? "text-Text bg-red-500 rounded-xl"
                      : row.Status === "เสร็จสิ้น"
                      ? "text-Text bg-green-500 rounded-xl"
                      : "text-black"
                  }`}
                >
                  {row.Status}
                </p>
              </td>

              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static lg:rounded-r-xl">
                <button
                  onClick={() => handleEditClick(row)}
                  className="px-4 py-2 bg-Primary text-white rounded-md"
                >
                  แก้ไข
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleEditModalClose}
        contentLabel="Edit Queue Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <span className="close" onClick={handleEditModalClose}>
          &times;
        </span>
        <h2>รายงานผู้แจ้ง</h2>
        {selectedRow && (
          <>
            <div className="space-y-reverse space-y-1">
            <p className="gap-2">ID: {selectedRow.ID}</p>
            <p>ชื่อผู้แจ้ง: {selectedRow.Name}</p>
            <p>ประเภทงาน: {selectedRow.JobType}</p>
            <p>แผนก/แผนงาน: {selectedRow.Department}</p>
            <p>เบอร์โทร: {selectedRow.ContactNumber}</p>
            <p>ปัญหา: {selectedRow.Issue}</p>
            <p>ที่อยู่ของอุปกรณ์ที่เกิดปัญหา: {selectedRow.Location}</p>
            <p>รายละเอียดอื่นเพิ่มเติม: {selectedRow.Note}</p>
            <p className="space-y-reverse space-y-4">สถานะการดำเนินงาน: {selectedRow.Status}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <label className="block">
            <span className="flex flex-col text-gray-700 ">แก้ไขสถานะ:</span>
          <select
            name="Status"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-600  shadow-sm"
            required
          >
            <option value="">เลือกสถานะ</option>
            <option value="กำลังดำเนินการติดตาม">กำลังดำเนินการติดตาม</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
          </select>
        </label> 
              <button onClick={handleSubmit} className="bg-Background ">
                บันทึกการแก้ไข
              </button>
            </form>
          </>
        )}
      </Modal>
       <DashQuerry fetchData={fetchData}/>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Next
      </button>{" "}
      {/* ปุ่ม "Previous" */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === data.length - 1}
      >
        Previous 
      </button>{" "}
      {/* ปุ่ม "Next" */}
    </>
  );
}

export default AdminDB;
