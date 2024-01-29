import React, { useEffect, useState } from "react";
import Technic from "../assets/htclogo50.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  openNav
} from "@material-tailwind/react";

function HeaderAdmin() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedRow(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateData = () => {
    // ทำการอัปเดตข้อมูลในรายการหลักของคุณ
    // ...

    // ปิด modal
    handleEditModalClose();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token Payload:', decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const handleLogout = async () => {
    try {
      navigate("/");
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  // Check and refresh token every 5 minutes
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refreshToken();
  //   }, 5 * 60 * 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // Retrieve username from LocalStorage
  const token = localStorage.getItem('token');
  const username = jwtDecode(token);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <img src={Technic} alt="htclogo" />
        <Typography
          as="a"
          href="https://peeranat.online"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          วิทยาลัยเทคนิคหาดใหญ่
        </Typography>

        {/* Display the username in the Navbar */}
        <Typography className="mr-2 ml-auto cursor-pointer py-1.5 font-medium ">
          {username && `Welcome, ${username.username}!`}
        </Typography>

        <Button
          size="sm"
          onClick={handleLogout}
          variant=""
          className="mr-7 ml-auto bg-red-500"
        >
          <span className="">Log Out</span>
        </Button>
      </div>
      <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
    </Navbar>
  );
}

export default HeaderAdmin;
