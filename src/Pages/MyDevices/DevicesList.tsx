import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Reducers"; // Update this path according to your project structure
import { getAllData } from "../../Actions/Table/table";

// Images
import { TableComponent } from "../../Components/publicTable/Main";
import { setAuthToken } from "Services/httpService";

interface Device {
  DeviceSerial: string;
  DeviceName: string;
  DeviceCode: string;
  Status: number;
}

const DevicesList: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);
  useEffect(() => {
    setLoading(false);
    setAuthToken();
  }, []);
  const handleGetDevicesList = async () => {
    try {
      const { allData } = await dispatch(getAllData("DeviceGetAll", "SET-DEVICES"));

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
    handleGetDevicesList();
  }, []);

  // Set Titles
  const titles = [
    { title: "سریال دستگاه" },
    { title: "نام دستگاه" },
    { title: " کد دستگاه " },
    { title: " وضعیت " },
  ];

  const dataShow = devices?.map(item => [
    item.DeviceSerial !== null || undefined ? item.DeviceSerial : " ",
    item.DeviceName !== null || undefined ? item.DeviceName : " ",
    item.DeviceCode !== null || undefined ? item.DeviceCode : " ",
    item.Status !== null || undefined ? item.Status : "",
    item.Status !== null || undefined ? item.Status : "",
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
      handleGetDevicesList(); // Fetch new order data if there are changes
    }
  }, [dataShow?.length]);
  return (
    <>
      <TableComponent page={"دستگاه"} data={userData || []} title={titles} />
    </>
  );
};

export default DevicesList;
