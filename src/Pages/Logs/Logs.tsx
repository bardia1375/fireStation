import React, { useEffect, useState } from "react";
import { TableComponent } from "../../Components/publicTable/Main";

type Props = {};

export default function Logs({ Logsdata }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [deviceState, setDeviceState] = useState([]); // Initialize as an empty array
  const role = localStorage.getItem("role");
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleGetOperationList = async () => {
    setDevices([
      {
        DeviceSerial: " ایستگاه اول",
        shamsiStartDate: "1403-12-04",
        startTime: " ",
        endTime: " ",
        duration: "",
        sms: "مشاهده",
        time: "",
      },
    ]);
    try {
      // await serverApi.get("Setting/GetSetting").then(res => {
      //   setTime(res.data.time);
      // });
      // await serverApi
      //   .get("Mission/GetMissions")
      //   .then(res => {
      //     console.log("resres", res.data);
      //     // setDevices([
      //     //   {
      //     //     DeviceSerial: " ایستگاه اول",
      //     //     shamsiStartDate: " ایستگاه اول",
      //     //     startTime: " ",
      //     //     endTime: " ",
      //     //     duration: "",
      //     //     sms: "مشاهده",
      //     //     time: "",
      //     //   },
      //     // ]);
      //   })
      //   .catch(() => {
      //     setDevices([
      //       {
      //         DeviceSerial: " ایستگاه اول",
      //         shamsiStartDate: "1403-12-04",
      //         startTime: " ",
      //         endTime: " ",
      //         duration: "",
      //         sms: "مشاهده",
      //         time: "",
      //       },
      //     ]);
      //   });
      setDevices([
        {
          name: " ایستگاه اول",
          ip: " ایستگاه اول",
          port: " ",
          isActive: " ",
          lastDailyMissionTime: "",
          sms: "مشاهده",
          time: "",
        },
      ]);
      // if (allData) {
      //   setDevices(allData);
      // }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching devices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOperationList();
  }, []);
  // useEffect(() => {
  //   serverApi.get("Setting/GetSetting").then(res => {
  //     setTime(res.data.time);
  //   });
  // }, []);
  // Set Titles
  const titles = [{ title: "کاربر" }, { title: "تاریخ" }, { title: "شرح" }];
  console.log("devicesdevicesdevices", devices);
  console.log("bardiasalam", deviceState);
  console.log("Logsdata", Logsdata);

  const dataShow = Logsdata?.map(item => [
    item.fullName !== null || undefined ? item.fullName : " ایستگاه نامشخص",
    item.dateTime !== null || undefined ? item.dateTime : "-",
    item.message !== null || undefined ? item.message : "-",
    item.id !== null || undefined ? item.id : "-",
  ]);

  // useEffect(() => {
  //   if (dataShow && dataShow.length !== 0) {
  //     localStorage.setItem("DeviceTable", JSON.stringify(dataShow)); // Store order data in local storage
  //     setUserData(dataShow);
  //   }
  //   if (dataShow && dataShow.length === 0) {
  //     setUserData(userData);
  //   }
  // }, [dataShow?.length]);

  // // Effect hook to check for changes in order data and fetch new data if needed
  // useEffect(() => {
  //   // Get stored order data from local storage
  //   const storedUserDataString = localStorage.getItem("DeviceTable");

  //   // Parse stored order data if it exists, or set to an empty array if null
  //   const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : [];

  //   // Update user data state with stored data
  //   setUserData(storedUserData);

  //   // Check if there is user data, dataShow has a length, and they are different
  //   if (
  //     userData &&
  //     dataShow &&
  //     dataShow.length !== 0 &&
  //     dataShow?.sort().join(",") !== userData?.sort().join(",")
  //   ) {
  //     handleGetOperationList(); // Fetch new order data if there are changes
  //   }
  // }, [dataShow?.length]);

  return (
    <>
      {" "}
      <TableComponent
        page={"تاریخچه"}
        data={dataShow || []}
        TableData={userData || []}
        title={titles}
        navigateEditAddress="/stations"
      />
    </>
  );
}
