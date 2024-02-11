import React from "react";
import Technic from "../assets/htclogo75.png";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  navList,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

function Header() {
  const navigate = useNavigate();

  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
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
            <img src={Technic} alt="htclogo" className="md:ml-0"></img>
            <p className="lg:text-3xl font-bold">
              ระบบแจ้งซ่อม IT Support วิทยาลัยเทคนิคหาดใหญ่
            </p>
            <ul className="mt-2 mb-4 flexflex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <IconButton
                variant="text"
                className="flex flex-col ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
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
              <Collapse open={openNav}>
                <div className="container mx-auto">
                  {navList}
                  <div className="flex items-center gap-x-1">
                    <Button fullWidth variant="text" size="sm" onClick={handleSubmit} className="bg-gradient-to-r from-Secondary to-Accent hover:bg-Primary font-bold py-2 px-4 rounded">
                      <span className="text-Background">แจ้งปัญหา</span>
                    </Button>
                    <Button fullWidth variant="gradient" size="sm" onClick={handleSubmitLogin} className="hover:text-white hover:bg-gradient-to-br from-Secondary via-CenterC to-Accent font-bold py-2 px-4 rounded">
                      <span>Login</span>
                    </Button>
                  </div>
                </div>
              </Collapse>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row hidden md:block mx-2">
            <button
              onClick={handleSubmit}
              className=" hover:bg-Primary bg-Secondary font-bold py-2 px-4 rounded "
            >
              แจ้งปัญหาการใช้งาน
            </button>
            <button
              onClick={handleSubmitLogin}
              className=" hover:text-white bg-Secondary ml-1 hover:bg-gradient-to-br from-Secondary via-CenterC to-Accent font-bold py-2 px-4 rounded "
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
