import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Reducers";
import { getAllData } from "../../Actions/Table/table";
import DatePicker from "react-multi-date-picker";
import { ConfigureButton } from "../../assets/styles/layout/Calendar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import { convertNumbersToEnglish } from "../../Utils/commonFunctions"; // Import the function for number conversion

// Images
import { TableComponent } from "../../Components/publicTable/Main";
import serverApi from "Services/httpService";
import { getReports } from "./services/services";
import DateRangePicker from "./DateRange";

interface Device {
  DeviceSerial: string;
  DeviceName: string;
  DeviceCode: string;
  Status: number;
}

const Report: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [fromTime, setFromTime] = useState<any>("");
  const [toTime, setToTime] = useState<any>("");
  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    // setFromTime(moment().format("jYYYY-jMM-jDD"))
    // setToTime(moment().format("jYYYY-jMM-jDD"))
  }, []);
  const handleGetOperationList = async () => {
    try {
      const payload = {
        page: 1,
        limit: 1000,
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        // stationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };
      // const data = getReports(fromTime, toTime).then(res => res.data);
      // console.log("sdfsdfsdf", data);
      serverApi.post(`/Missions/MissionReport`, payload).then(res => {
        setDevices(res.data.data.data);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching devices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOperationList();
  }, []);

  const [time, setTime] = useState();
  const titles = [
    { title: "کاربر" },
    { title: "ایستگاه" },
    { title: "تاریخ" },
    { title: "ساعت" },
    // { title: "ip" },
    // { title: "port" },
    { title: "مدت زمان" },
    { title: "وضعیت" },
    { title: "کیفیت" },
  ];

  console.log("devicesdevicesdevices", devices);
  //   {
  //     "id": "cf59aae5-15b0-4429-6238-08dcdadfd976",
  //     "fullName": "Admin Admin",
  //     "stationName": "Station1",
  //     "ip": "192.168.20.116",
  //     "port": 8080,
  //     "date": "1403/07/01",
  //     "time": "11:53:34",
  //     "duration": 0,
  //     "endedType": "در حال انجام",
  //     "qualityType": null
  // }
  //   {
  //     "id": "f1c66c2e-09e5-4946-d92b-08dcdae59a85",
  //     "fullName": "Admin Admin",
  //     "stationName": "Station2",
  //     "ip": "192.168.20.115",
  //     "port": 8080,
  //     "date": "1403/07/01",
  //     "time": "14:09:15",
  //     "duration": 36,
  //     "endedType": "کارت",
  //     "qualityType": "زشت"
  // }
  const dataShow = devices?.map(item => [
    item.fullName ?? "-",

    item.stationName ?? "1403-12-04",
    item.date ?? "-",
    item.time ?? "-",

    // item.ip ?? "12:22",
    // item.port ?? "13:45",
    item.duration ?? "345 ثانیه",
    item.endedType ?? "345",
    item.qualityType ?? "345",
    item.id ?? "345",
  ]);

  const AccordionTitle = devices?.map(item => [{ title: "پیام", value: item.sms }]);

  // const handleSubmit = () => {
  //   // Check if fromTime and toTime are not null
  //   if (fromTime && toTime) {
  //     // Convert fromTime and toTime from Persian to Gregorian
  //     const formattedFromTime = moment(fromTime).format("jYYYY-jMM-jDD");
  //     const formattedToTime = moment(toTime).format("jYYYY-jMM-jDD");
  //     console.log("formattedFromTime", formattedToTime);
  //     console.log("formattedToTime", formattedToTime);

  //     const data = {
  //       page: 1,
  //       limit: 1000,
  //       fromDate: formattedFromTime,
  //       toDate: formattedToTime,
  //     };

  //     // Log the formatted dates
  //     console.log("From Time:", formattedFromTime);
  //     console.log("To Time:", formattedToTime);

  //     // Perform your submission or API call with these dates
  //     serverApi
  //       .post("/Missions/MissionReport", data)
  //       .then(response => {
  //         setDevices(response.data.data.data);
  //         console.log("Submission successful:", response.data.data.data[0]);
  //       })
  //       .catch(error => {
  //         console.error("Submission error:", error);
  //       });
  //   } else {
  //     console.error("Both fromTime and toTime need to be selected.");
  //   }
  // };
  console.log("devdevicesices", devices);
  const getData = item => {
    setDevices(item);
  };
  return (
    <>
      <TableComponent
        excelExport
        // AccordionTitle={AccordionTitle}
        // accordion
        page={"دستگاه"}
        devices={devices}
        data={dataShow || []}
        TableData={userData || []}
        title={titles}
        // dataPrint={dataPrint}
        reportTiming={<DateRangePicker getData={getData} />}
      />
    </>
  );
};

export default Report;
