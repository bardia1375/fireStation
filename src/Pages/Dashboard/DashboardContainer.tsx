import Modal from "Components/Modal/Modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FormContainer from "./Form/FormContainer";
import { GetMissionSettings, getStations } from "./Services/services";
import Dashboard from "./Dashboard";
import { createSignalRConnection, startConnection } from "../../signalrService.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Include skeleton CSS for styling

const DashboardContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const [active, setActive] = useState(false);
  const [missionId, setMissionId] = useState(true); // State to hold missionId

  const [deviceState, setDeviceState] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const connection = startConnection(setDeviceState);

    return () => {
      connection?.stop(); // قطع اتصال هنگامUnmount
    };
  }, []);

  useEffect(() => {
    // Log the deviceState to verify the structure of data received
    console.log("Updated deviceState:", deviceState);
  }, [deviceState]);

  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const canStartMission = missionId => {
    console.log("missionId", missionId);
    setMissionId(missionId);
    localStorage.setItem("missionId", missionId); // Save missionId to localStorage
  };
  useEffect(() => {
    const bardia = deviceState.map(res => {
      return res.isActive === true;
    });
    console.log("barbardiadia", bardia);
  }, [deviceState]);
  return (
    <SContainer style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)", // Cleaner grid styling
          gap: "8px",
        }}
      >
        {
          // Render the actual content when loading is done
          Array.isArray(deviceState) && deviceState.length > 0
            ? deviceState
                .filter(station => station.isActive === true) // Filter stations with isActive true
                .map((station, index) => (
                  <Dashboard
                    id={station.id + index}
                    stationId={station.id}
                    key={station.id}
                    firstName={station.firstName}
                    lastName={station.lastName}
                    hasConnection={station.hasConnection}
                    hasCurrentMission={station.hasCurrentMission}
                    onEdit={() => handleEdit(station)}
                    missionNumber={station.missionNumber}
                    currentMissionDuration={station.currentMissionDuration}
                    name={station.name}
                    lastDailyMissionTime={station.lastDailyMissionTime}
                    isActive={station.isActive}
                    connect={station.connect}
                    dataLength={index === 0}
                    setShowModal={setShowModal}
                    lastDailyMissionDuration={station.lastDailyMissionDuration}
                    dailyMissionCount={station.dailyMissionCount}
                  />
                ))
            : // Render Skeletons while data is loading
              [...Array(7)].map((_, index) => (
                <SkeletonContainer key={index}>
                  <Skeleton height={150} width="100%" />
                  <Skeleton height={25} width="60%" style={{ marginTop: "10px" }} />
                  <Skeleton height={20} width="80%" style={{ marginTop: "8px" }} />
                </SkeletonContainer>
              ))
        }
      </div>
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

const SkeletonContainer = styled.div`
  background: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
