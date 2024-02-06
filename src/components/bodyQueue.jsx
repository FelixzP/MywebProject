import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash"; // นำเข้า lodash
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

function RepairQueue() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // สถานะสำหรับการจัดการหน้าที่แสดงอยู่

  const rowsPerPage = 7; // จำนวนแถวต่อหน้า

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

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-Text">รายการคิว</h1>
      <table className="min-w-full border-separate border-spacing-y-4 divide-y backdrop-blur rounded-xl text-Text">
        <thead>
          <tr className="bg-transparent rounded-xl">
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75  text-Text lg:text-center rounded-l-xl">
              ลำดับ
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              ชื่อผู้แจ้ง
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              ประเภทงานที่ต้องการซ่อม
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              สถานที่ในการแจ้งซ่อม
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              ฝ่ายงานของผู้แจ้งปัญหา
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              วันที่แจ้งปัญหา
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center ">
              ปัญหาการใช้งาน
            </th>
            <th className="px-4 py-2 hidden lg:table-cell backdrop-blur bg-Primary/75   text-Text lg:text-center rounded-r-xl">
              รับเรื่อง
            </th>
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
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static ">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase ">
                  ชื่อผู้แจ้ง
                </span>

                <p className="px-4 py-2">{row.Name}</p>
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
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  วันที่แจ้งปัญหา
                </span>

                <p className="px-4 py-2">
                  {new Date(row.CreatedAt).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    // hour: "numeric",
                    // minute: "numeric",
                    // second: "numeric",
                  })}
                </p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  ปัญหาการใช้งาน
                </span>

                <p className="px-4 py-2 truncate w-40 line-clamp-2">{row.Issue}</p>
              </td>
              <td className="w-full lg:w-auto p-3 backdrop-blur bg-Secondary/30  text-Text lg:text-center md:text-left block lg:table-cell relative lg:static lg:rounded-r-xl">
                <span className=" lg:hidden absolute top-0 left-0 backdrop-blur bg-Secondary/30 rounded-xl text-Text px-2 py-1 text-xs font-bold uppercase">
                  สถานะรับเรื่อง
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

export default RepairQueue;
