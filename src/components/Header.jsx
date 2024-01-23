import React from "react";
import Technic from "../assets/htclogo75.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/repairForm");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <nav className="border-black border-b-2 shadow-lg bg-ourwhite text-ourtext text-Text">
        <div className="md:flex items-center justify-between py-0 px-8 md:px-3  ">
          <div className="flex justify-between items-center">
            <img src={Technic} alt="htclogo"></img>
            <p className="lg:text-3xl font-bold">
              ระบบแจ้งซ่อม IT Support วิทยาลัยเทคนิคหาดใหญ่
            </p>
            <div className="md:hidden">
              <button
                type="button"
                className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    className="hidden"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                  />
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row hidden md:block mx-2">
            <button
              onClick={handleSubmit}
              className=" hover:bg-Primary font-bold py-2 px-4 rounded "
            >
              แจ้งปัญหาการใช้งาน
            </button>
            <button
              onClick={handleSubmitLogin}
              className=" hover:text-white hover:bg-gradient-to-br from-Secondary via-CenterC to-Accent font-bold py-2 px-4 rounded "
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
