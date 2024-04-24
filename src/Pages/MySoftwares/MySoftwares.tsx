import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Reducers";
import { getAllData } from "../../Actions/Table/table";
import { numberWithCommasAndPersian } from "../../Components/Commons/NumberToPersian";
// Images
import { TableComponent } from "../../Components/publicTable/Main";
import { setAuthToken } from "Services/httpService";

interface GenericTableProps<T> {
  page: string;
  data: Array<Array<string | JSX.Element | T>>;
  title: Array<{ title: string }>;
  loading: boolean;
  facilitiUrl: string;
  facilitiesTitle: string;
  TableData: T[];
}

interface SoftwareItem {
  SoftwareSerial: string;
  SoftwareName: string;
  SoftwareStatus: string;
  CustomerSoftwareId: string;
  SoftwarePrice: string;
}

const MySoftwares: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [softwares, setSoftwares] = useState<SoftwareItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // setLoading(false);
    setAuthToken();
  }, []);

  const handleGetMySoftwaresList = async () => {
    try {
      // setLoading(true);
      const { allData } = await dispatch(getAllData("CustomerSoftwareGetAll", "SET-SOFTWARES", {}));

      if (allData) {
        setSoftwares(allData);
      }

      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMySoftwaresList();
  }, []);

  const titles = [
    { title: "سریال نرم‌افزار" },
    { title: "نام نرم‌افزار" },
    { title: "وضعیت" },
    // { title: " قیمت بروزشده " },
  ];

  const dataShow = softwares?.map((software: SoftwareItem) => [
    software.SoftwareSerial ?? " ",
    software.SoftwareName ?? " ",
    software.SoftwareStatus ?? "",
    // `${numberWithCommasAndPersian(software.SoftwarePrice)} ریال` ?? "",
    software.CustomerSoftwareId ?? "",
  ]);
  // Effect hook to update local storage when order data changes
  useEffect(() => {
    if (dataShow && dataShow.length !== 0) {
      localStorage.setItem("SoftwareTable", JSON.stringify(dataShow)); // Store order data in local storage
      setUserData(dataShow);
    }
    if (dataShow && dataShow.length === 0) {
      setUserData(userData);
    }
  }, [dataShow?.length]);

  // Effect hook to check for changes in order data and fetch new data if needed
  useEffect(() => {
    // Get stored order data from local storage
    const storedUserDataString = localStorage.getItem("SoftwareTable");

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
      handleGetMySoftwaresList(); // Fetch new order data if there are changes
    }
  }, [dataShow?.length]);
  const genericTableProps: GenericTableProps<SoftwareItem> = {
    page: "نرم ",
    data: userData || [],
    title: titles,
    // loading: loading,
    facilitiUrl: "/mySoftware/",
    // facilitiesTitle: "امکانات",
    TableData: softwares || [],
  };

  return <TableComponent {...genericTableProps} />;
};

export default MySoftwares;
