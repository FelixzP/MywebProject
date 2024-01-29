import React from "react";
import AdminDB from "../components/bodyAdmin";
import UserAdmin from "./bodyListAdmin";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

function DashBoard() {

  

  return (
    <>
      <div className="flex flex-col h-auto bg-gray-100">
        <div className="flex-1 p-4 w-full :w-1/2">
          <div className="relative max-w-md w-full">
            <div className="absolute top-1 left-2 inline-flex items-center p-2">
              <i className="fas fa-search text-Text"></i>
            </div>
            <input
              className="w-full h-10 pl-10 pr-4 py-1 text-base bg-gradient-to-br from-Secondary to-Accent border rounded-full focus:shadow-outline placeholder:text-Text"
              type="search"
              placeholder="ค้นหา"
            ></input>
          </div>

          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <div className="bg-white p-4 rounded-md mt-4">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">คิว</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
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
            <div className="bg-gradient-to-r from-Secondary via-LoginC  h-px mb-6"></div>
            <UserAdmin></UserAdmin>
            <div className="text-right mt-4">
                <div className="text-right mt-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                    สร้าง User ใหม่
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
