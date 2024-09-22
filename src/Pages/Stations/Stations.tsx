import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Reducers"; // Update this path according to your project structure
import { getAllData } from "../../Actions/Table/table";
import { createSignalRConnection, startConnection } from "../../signalrService.js";
// Images
import { TableComponent } from "../../Components/publicTable/Main";
import serverApi, { setAuthToken } from "Services/httpService";
import { useAppContext } from "Context/AppContext";
import Modal from "Components/Modal/Modal";
import FormContainer from "./Form/FormContainer";
import FormPingContainer from "./Form/FormPingContainer";

interface Device {
  DeviceSerial: string;
  DeviceName: string;
  DeviceCode: string;
  Status: number;
}

const Stations: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const {
    showModal,
    openModal,
    closeModal,
    selectedUser,
    setShowModal,
    setShowPingModal,
    showPingModal,
  } = useAppContext(); // Use the context

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [deviceState, setDeviceState] = useState([]); // Initialize as an empty array

  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);
  useEffect(() => {
    setLoading(false);
    setAuthToken();
  }, []);
  useEffect(() => {
    const connection = startConnection(setDeviceState);

    return () => {
      connection?.stop(); // قطع اتصال هنگامUnmount
    };
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
  const [time, setTime] = useState();
  // useEffect(() => {
  //   serverApi.get("Setting/GetSetting").then(res => {
  //     setTime(res.data.time);
  //   });
  // }, []);
  // Set Titles
  const titles = [
    { title: "ایستگاه" },
    { title: "ip" },
    { title: "port" },
    { title: "اخرین ماموریت" },
    { title: "وضعیت" },
  ];
  console.log("devicesdevicesdevices", devices);
  console.log("bardiasalam", deviceState);

  const dataShow = deviceState?.map(item => [
    item.name !== null || undefined ? item.name : " ایستگاه نامشخص",
    item.ip !== null || undefined ? item.ip : "-",
    item.port !== null || undefined ? item.port : "-",
    item.lastDailyMissionTime !== null || undefined ? item.lastDailyMissionTime : "-",
    item.isActive !== null || undefined ? (!!item.isActive ? "فعال" : "غیرفعال") : "efv",
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
  console.log("devicesdevices", devices);

  const AccordionTitle = devices?.map(item => [{ title: "پیام", value: item.sms }]);
  console.log("dataShodataShoww", dataShow);
  const EditModalOpen = () => {
    "clicked";
  };

  const closeModalContainer = () => {
    setShowModal(false);
  };
  const closeModalPing = () => {
    setShowPingModal(false);
  };
  const getData = data => {
    setUserData(data);
  };
  return (
    <>
      <TableComponent
        EditModalOpen={() => EditModalOpen()}
        // AccordionTitle={AccordionTitle}
        // accordion

        page={"دستگاه"}
        data={dataShow || []}
        TableData={userData || []}
        title={titles}
        penButton
        settingButton
        navigateEditAddress="/stations"
      />
      <Modal showModal={showModal} closeModal={closeModalContainer} width="80vw">
        <FormContainer getData={getData} setShowModal={setShowModal} deviceState={deviceState} />
      </Modal>
      <Modal showModal={showPingModal} closeModal={closeModalPing} width="50vw">
        <FormPingContainer
          getData={getData}
          setShowModal={setShowModal}
          deviceState={deviceState}
        />
      </Modal>
    </>
  );
};

export default Stations;
