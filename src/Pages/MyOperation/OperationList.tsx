import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Reducers"; // Update this path according to your project structure
import { getAllData } from "../../Actions/Table/table";

// Images
import { TableComponent } from "../../Components/publicTable/Main";
import serverApi, { setAuthToken } from "Services/httpService";

interface Device {
  DeviceSerial: string;
  DeviceName: string;
  DeviceCode: string;
  Status: number;
}

const OperationList: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);
  useEffect(() => {
    setLoading(false);
    setAuthToken();
  }, []);
  const handleGetOperationList = async () => {
    try {
      serverApi.get("Mission/GetMissions").then(res => {
        console.log("resres", res.data);
        setDevices(res.data);
      });
      if (allData) {
        setDevices(allData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching devices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOperationList();
  }, []);

  // Set Titles
  const titles = [
    { title: "ایستگاه" },
    { title: "زمان آغاز" },
    { title: "زمان پایان" },
    { title: "مدت زمان" },
    { title: "پیام" },
  ];

  const dataShow = devices?.map(item => [
    item.DeviceSerial !== null || undefined ? "ایستگاه اول" : " ایستگاه اول",
    item.startTime !== null || undefined ? item.startTime : " ",
    item.endTime !== null || undefined ? item.endTime : " ",
    item.duration !== null || undefined ? `${item.duration} ثانیه` : "",
    item.sms !== null || undefined ? "مشاهده" : "مشاهده",
    item.sms !== null || undefined ? item.sms : "",
  ]);
  useEffect(() => {
    if (dataShow && dataShow.length !== 0) {
      localStorage.setItem("DeviceTable", JSON.stringify(dataShow)); // Store order data in local storage
      setUserData(dataShow);
    }
    if (dataShow && dataShow.length === 0) {
      setUserData(userData);
    }
  }, [dataShow?.length]);

  // Effect hook to check for changes in order data and fetch new data if needed
  useEffect(() => {
    // Get stored order data from local storage
    const storedUserDataString = localStorage.getItem("DeviceTable");

    // Parse stored order data if it exists, or set to an empty array if null
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : [];

    // Update user data state with stored data
    setUserData(storedUserData);

    // Check if there is user data, dataShow has a length, and they are different
    if (
      userData &&
      dataShow &&
      dataShow.length !== 0 &&
      dataShow?.sort().join(",") !== userData?.sort().join(",")
    ) {
      handleGetOperationList(); // Fetch new order data if there are changes
    }
  }, [dataShow?.length]);
  console.log("devicesdevices", devices);

  const AccordionTitle = devices?.map(item => [{ title: "پیام", value: item.sms }]);
  return (
    <>
      <TableComponent
        AccordionTitle={AccordionTitle}
        accordion
        page={"دستگاه"}
        data={userData || []}
        TableData={userData || []}
        title={titles}
      />
    </>
  );
};

export default OperationList;
