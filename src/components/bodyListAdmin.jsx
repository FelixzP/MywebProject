import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash"; // นำเข้า lodash

function UserAdmin() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // สถานะสำหรับการจัดการหน้าที่แสดงอยู่

  const rowsPerPage = 5; // จำนวนแถวต่อหน้า

  useEffect(() => {
    axios
      .get("https://api.peeranat.online/api/allAdmin") // API
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
      <h1 className="text-2xl font-bold text-center text-Text">รายการผู้ใช้งาน</h1>
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
            </tr>
          ))}
        </thead>
      </table>
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
