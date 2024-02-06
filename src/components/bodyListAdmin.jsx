import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash"; // นำเข้า lodash
import Modal from "react-modal";

function UserAdmin() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // สถานะสำหรับการจัดการหน้าที่แสดงอยู่
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const rowsPerPage = 5; // จำนวนแถวต่อหน้า

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.patch(
        `https://api.peeranat.online/api/updatePassword/${selectedRow.ID}`, // ปรับ URL ตาม API ของคุณ
        form
      );

      console.log(response.data);
      handleEditModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const [form, setForm] = useState({
    Username:"",
    Password: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  useEffect(() => {
    axios
      .post("https://api.peeranat.online/api/allAdmin")
      .then((response) => {
        console.log(response);
        setData(_.chunk(response.data, rowsPerPage)); // แบ่งข้อมูลออกเป็นชุดของแถว
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-Text">
        รายการผู้ใช้งาน
      </h1>
      <table className="min-w-full border-separate border-spacing-y-2 divide-y backdrop-blur rounded-xl text-Text">
        <thead>
          <tr className="bg-transparent rounded-xl">
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center rounded-l-xl">
              ID
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center">
              Username
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Secondary/30  text-Text lg:text-center ">
              Password
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
                  ID
                </span>

                <p className="px-4 py-2">{row.ID}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase ">
                  Username
                </span>

                <p className="px-4 py-2">{row.Username}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase ">
                  Password
                </span>
                <p className="px-4 py-2">{row.Password}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
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
        <h1>แก้ไขรหัสผ่าน</h1>
        
        {selectedRow && (
          <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <div className="space-y-reverse space-y-1">
              <p className="gap-2">ID: {selectedRow.ID}</p>
              <label className="block">
                <span className="text-gray-700 ">ชื่อผู้ใช้:</span>
                <input
                  name="Username"
                  onChange={handleChange}
                  placeholder={selectedRow.Username}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 ">รหัสผ่าน:</span>
                <input
                  name="Password"
                  placeholder={selectedRow.Password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </label>
            </div>
            
              <label className="block">
              </label>
              <button onClick={handleSubmit} className="bg-Background ">
                บันทึกการแก้ไข
              </button>
            </form>
          </>
        )}
      </Modal>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Previous
      </button>{" "}
      {/* ปุ่ม "Previous" */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === data.length - 1}
      >
        Next
      </button>{" "}
      {/* ปุ่ม "Next" */}
    </>
  );
}

export default UserAdmin;
