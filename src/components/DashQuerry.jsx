import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";


function DashQuerry() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    // เรียกใช้งาน fetchData() เมื่อ selectedMonth, startDate, หรือ endDate เปลี่ยนแปลง
    const { firstDayOfMonth, lastDayOfMonth } =
      calculateMonthRange(selectedMonth);

    // ทำอย่างอื่นตามต้องการ, เช่น อัพเดท state
    fetchData(firstDayOfMonth, lastDayOfMonth);
  }, [selectedMonth]);

  const fetchData = (start, end) => {
    const formattedStartDate = start.toISOString().split("T")[0];
    const formattedEndDate = end.toISOString().split("T")[0];

    axios
      .get(
        `https://api.peeranat.online/api/supportFormsByDate/${formattedStartDate}/${formattedEndDate}`,
        {}
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  const calculateMonthRange = (month) => {
    const currentDate = new Date();
    const selectedYear = currentDate.getFullYear();

    // If month is not provided, use the current month
    if (month === null || month === undefined) {
      month = currentDate.getMonth();
    }

    const firstDayOfMonth = new Date(selectedYear, month, 1);
    const lastDayOfMonth = new Date(selectedYear, month + 1, 0);

    return { firstDayOfMonth, lastDayOfMonth };
  };
  let chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "จำนวน",
        data: [
          {
            x: "ยังไม่ได้รับเรื่อง",
            y: data.filter((row) => row.Status === "ยังไม่ได้รับเรื่อง").length,
          },
          {
            x: "กำลังดำเนินการติดตาม",
            y: data.filter((row) => row.Status === "กำลังดำเนินการติดตาม")
              .length,
          },
          {
            x: "เสร็จสิ้น",
            y: data.filter((row) => row.Status === "เสร็จสิ้น").length,
          },
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: ["ยังไม่ได้รับเรื่อง", "กำลังดำเนินการติดตาม", "เสร็จสิ้น"],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const getTotalCases = () => data.length;

  const getCompletedCases = () =>
    data.filter((row) => row.Status === "เสร็จสิ้น").length;

  const getInProgressCases = () =>
    data.filter((row) => row.Status === "กำลังดำเนินการติดตาม").length;

  const getRemainingCases = () =>
    data.filter((row) => row.Status === "ยังไม่ได้รับเรื่อง").length;

  const getCasesByJobType = () => {
    const casesByJobType = _.groupBy(data, "JobType");
    return casesByJobType;
  };

  const getCasesByDepartment = () => {
    const casesByDepartment = _.groupBy(data, "Department");
    return casesByDepartment;
  };

  const renderCaseStats = () => <></>;
  const casesByJobType = getCasesByJobType();
  const chartConfig2 = {
    type: "pie",
    width: 280,
    height: 280,
    series: Object.keys(casesByJobType).map(
      (jobType) => casesByJobType[jobType].length
    ),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      labels: Object.keys(casesByJobType),
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -10,
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const renderCasesByJobType = () => {
    const casesByJobType = getCasesByJobType();
    return <></>;
  };

  const renderCasesByDepartment = () => {
    const casesByDepartment = getCasesByDepartment();
    return <></>;
  };
  const casesByDepartment = getCasesByDepartment();

  const handleMonthClick = (month) => {
  const currentDate = new Date();
  const selectedYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

    console.log(`Selected month: ${month + 1}`);
    console.log(
      `First day of month: ${firstDayOfMonth.toISOString().split("T")[0]}`
    );
    console.log(
      `Last day of month: ${lastDayOfMonth.toISOString().split("T")[0]}`
    );

    // ทำอย่างอื่นตามต้องการ, เช่น อัพเดท state
    setSelectedMonth(month);
  };

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return (
    <>
      <div className="flex justify-left content-center text-center">
      <Card className="lg:max-w-xl md:w-1/4 w-96 mb-2 lg:mb-2 ml-0 md:ml-0 lg:ml-16 ">
        <CardBody>
          <Menu>
            <MenuHandler>
              <Button className="bg-Secondary">เดือนที่กำหนด</Button>
            </MenuHandler>
            <MenuList>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => (
                <MenuItem key={month} onClick={() => handleMonthClick(month)}>
                  {monthNames[month]}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {selectedMonth !== null && (
            <div>
              <p className="text-center">
                เดือนที่เลือก: {monthNames[selectedMonth]}
              </p>
              {/* แสดงวันแรกและวันสุดท้ายของเดือน */}
            </div>
          )}
        </CardBody>
      </Card>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row gap-2 content-center justify-center">
        <Card className="flex-grow max-w-xl">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                จำนวนรายงานปัญหาที่เกิดขึ้น
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-md font-normal"
              >
                <div>
                  รายงานทั้งหมด: {getTotalCases()}&nbsp; เสร็จสิ้น:{" "}
                  {getCompletedCases()}&nbsp; กำลังดำเนินการติดตาม:{" "}
                  {getInProgressCases()}&nbsp; ยังไม่ได้รับเรื่อง:{" "}
                  {getRemainingCases()}
                </div>
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>

        <Card className="flex-grow max-w-xl">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                ปัญหาประเภทต่างๆ
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                แสดงจำนวนปัญหาที่เกิดขึ้นทั้งหมด : {getTotalCases()}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...chartConfig2} />
          </CardBody>
        </Card>

        <Card className="flex-grow max-w-xl overflow-auto">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                ภาควิชา/แผนงานที่รายงานปัญหาเข้ามา
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-md max-h-sm font-normal overflow-auto"
              >
                <div className="max-w-md h-50 overflow-auto">
                  {Object.keys(casesByDepartment).map((department) => (
                    <p key={department}>
                      {department}: {casesByDepartment[department].length}
                    </p>
                  ))}
                </div>
              </Typography>
            </div>
            <CardBody></CardBody>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default DashQuerry;
