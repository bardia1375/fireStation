import Modal from "Components/Modal/Modal";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormContainer from "./Form/FormContainer";
import { GetMissionSettings, getStations } from "./Services/services";
import Dashboard from "./Dashboard";
import {
  createSignalRConnection,
  startConnection,
  subscribeToUpdates,
} from "../../signalrService.js";

const DashboardContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  console.log("params", params);

  // استفاده از React Query برای دریافت داده‌ها
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getStations,
  });

  // Mock data state
  const [mockData, setMockData] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      imgUrl: "/path-to-image-2.jpg",
      missionNumber: "12",
      clockMission: "2",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      imgUrl: "/path-to-image-3.jpg",
      missionNumber: "13",
      clockMission: "3",
      name: "",
      connect: "",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imgUrl: "/path-to-image-1.jpg",
      missionNumber: "11",
      clockMission: "1",
      name: "",
      connect: "",
    },

    {
      id: 20,
      firstName: "David",
      lastName: "Williams",
      imgUrl: "/path-to-image-20.jpg",
      missionNumber: "14",
      clockMission: "4",
      name: "",
      connect: "",
    },
  ]);

  useEffect(() => {
    if (apiData && !isLoading) {
      const updatedMockData = [
        // { id: 999, firstName: "اضافه کردن", lastName: "", imgUrl: "" },
        ...apiData,
      ];
      setMockData(updatedMockData);
    }
  }, [apiData, isLoading]);

  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const getData = data => {
    setUserData(data);
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error fetching data</p>;
  const [data, setData] = useState([]);

  useEffect(() => {
    // ایجاد اتصال SignalR
    const connection = createSignalRConnection();

    // شروع اتصال به SignalR
    startConnection(connection);

    // مشترک شدن در به‌روزرسانی‌های SignalR
    subscribeToUpdates(connection, newData => {
      setData(prevData => [...prevData, newData]); // داده‌های جدید را به داده‌های فعلی اضافه می‌کند
    });

    // برگرداندن تابع تمیزکاری برای قطع ارتباط در صورت خروج از کامپوننت
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  console.log("signalRdata", data);

  return (
    <SContainer style={{ width: "100%", position: "relative" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr ", gap: "8px" }}
      >
        {Array(28)
          .fill({ id: 0 })
          .map((station, index) => (
            <Dashboard
              id={station.id + index}
              key={station.id}
              firstName={station.firstName}
              lastName={station.lastName}
              imgUrl={station.imgUrl}
              onEdit={() => handleEdit(station)}
              missionNumber={station.missionNumber}
              clockMission={station.clockMission}
              name={station.name}
              connect={station.connect}
              dataLength={index === 0}
              setShowModal={setShowModal}
            />
          ))}
      </div>
      {/* <Modal showModal={showModal} closeModal={closeModal} Submit={Submit}>
        <FormContainer getData={getData} setShowModal={setShowModal} mockData={mockData} />
      </Modal> */}
    </SContainer>
  );
};

export default DashboardContainer;
export const SContainer = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  overflow: auto;
`;
