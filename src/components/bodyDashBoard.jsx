import React, { useState, useEffect } from "react";
import AdminDB from "../components/bodyAdmin";
import UserAdmin from "./bodyListAdmin";
import DashQuerry from "./DashQuerry";
import { useNavigate } from "react-router-dom";


import Modal from "react-modal";

function DashBoard() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [form, setForm] = useState({
    Username: "",
    Password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/Register");
    } catch (error) {
      console.error(error);
    }
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


  return (
    <>
      <div className="flex flex-col h-auto bg-gray-100">
        <div className="flex-1 p-4 w-full :w-1/2">
          {/* <div className="relative max-w-md w-full">
            <div className="absolute top-1 left-2 inline-flex items-center p-2">
              <i className="fas fa-search text-Text"></i>
            </div>
            <input
              className="w-full h-10 pl-10 pr-4 py-1 text-base bg-gradient-to-br from-Secondary to-Accent border rounded-full focus:shadow-outline placeholder:text-Text"
              type="search"
              placeholder="ค้นหา"
            ></input>
          </div> */}
          <DashQuerry/>
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <div className="bg-white p-4 rounded-md mt-4">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">คิว</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-Secondary via-Accent  h-px mb-6"></div>
              <AdminDB></AdminDB>

              <div className="text-right mt-4">
                <div className="text-right mt-4">

                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">
              ผู้ใช้งาน
            </h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-Secondary via-Accent  h-px mb-6"></div>
            <UserAdmin></UserAdmin>
            <div className="text-right mt-4">
                <div className="text-right mt-4">
                  <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                    สร้าง User ใหม่
                  </button>
                  {/* <Modal
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
      </Modal> */}
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
