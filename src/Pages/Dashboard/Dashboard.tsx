import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RedLed from "../../assets/VideoIcon/redLed.png";
import GreenLed from "../../assets/VideoIcon/greenLed.png";
import YellowLed from "../../assets/VideoIcon/yellowLed.png";
import GreenTick from "../../assets/VideoIcon/greenTick.png";
import "./style.css";
import Modal from "Components/Modal/Modal";
// import { Button } from "Pages/Setting/Setting";
import serverApi from "Services/httpService";
import { Button } from "./Form/Form";
import styled from "styled-components";
import { useIsEndpointCrud } from "Utils/permissionUtils";

const Dashboard = ({
  firstName,
  lastName,
  stationId,
  onEdit,
  missionNumber,
  hasConnection,
  hasCurrentMission,
  currentMissionDuration, // داده به ثانیه
  name,
  lastDailyMissionTime,
  lastDailyMissionDuration,
  dailyMissionCount,
  id,
  isActive,
  ids,
  setIds,
  setIsModal,
}) => {
  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  };
  // Initialize clockMission based on whether a current mission exists
  console.log("currentMissionDuration", currentMissionDuration);

  const [clockMission, setClockMission] = useState(
    hasCurrentMission
      ? formatTime(currentMissionDuration)
      : formatTime(lastDailyMissionDuration ? lastDailyMissionDuration : "0")
  );
  useEffect(() => {
    if (!hasCurrentMission) {
      setClockMission(formatTime(lastDailyMissionDuration ? lastDailyMissionDuration : "0"));
    } else {
      setClockMission(formatTime(currentMissionDuration ? currentMissionDuration : "0"));
    }
  }, [hasCurrentMission, currentMissionDuration]);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isClick, setIsClick] = useState(false);
  const role = localStorage.getItem("role");



  // Create ref outside the useEffect
const prevHasCurrentMissionRef = React.useRef(hasCurrentMission);

// Fix the effect to use the ref properly
useEffect(() => {
  // If hasCurrentMission was true before and is now false (mission ended)
  if (prevHasCurrentMissionRef.current === true && hasCurrentMission === false) {
    setIsClick(false); // Reset isClick when mission ends
    setIds([])
  }
  
  // Update the ref with current value for next render
  prevHasCurrentMissionRef.current = hasCurrentMission;
}, [hasCurrentMission]);

useEffect(() => {
  if (setIsModal) {
    setIsModal(() => setIsModalVisible);
  }
}, [setIsModal]);





  useEffect(() => {
    if (setIsModal) {
      setIsModal(() => setIsModalVisible); // تابع setLocalModal را به والد ارسال می‌کنیم
    }
  }, [setIsModal]);
  // Utility function to format time from seconds to "MM : SS"

  useEffect(() => {
    let timer;

    if (isTimerRunning && hasCurrentMission) {
      // Eğer timer çalışıyorsa ve currentMission varsa, interval başlatılır
      timer = setInterval(() => {
        setClockMission(prevTime => {
          const [minutes, seconds] = prevTime.split(" : ").map(Number);
          const totalSeconds = minutes * 60 + seconds + 1; // 1 saniye ilerlet
          return formatTime(totalSeconds);
        });
      }, 1000);
    } else {
      // Eğer currentMission false ise, timer'ı durdur
      setIsTimerRunning(false);
    }

    // Cleanup: Timer'ı clear et
    return () => clearInterval(timer);
  }, [isTimerRunning, hasCurrentMission]);

  // Show the modal on image click
  const handleImageClick = () => {
    // setIsModalVisible(true);
    setIsClick(!isClick);
    setIds(prev => {
      // Check if stationId is already in the array
      if (!prev.includes(stationId)) {
        return [...prev, stationId]; // Add stationId to the array
      } else {
        const filterStation = ids?.filter(el => el !== stationId);
        return filterStation; // If stationId already exists, remove it
      }
    });
  };
  const handleYellowImageClick = () => {
    setIsModalVisible(true);
  };
  // Confirm the operation and start the timer
  const handleConfirm = () => {
    setIsModalVisible(false); // Close the modal
    setIsTimerRunning(true); // Start the timer
    setIsClick(false);
    // setIds([])
    console.log("2342352435345345", hasCurrentMission, stationId,ids);

    if (!hasCurrentMission) {
      serverApi.post(`/Missions/GroupStartMission`, ids).then(res => { 
        console.log("res", res.data);
      });
    } else {
      serverApi.post(`/Missions/StopMission?stationId=${stationId}`).then(res => {
        console.log("res", res.data);
      });
    }
  };

  // Cancel the operation
  const handleCancel = () => {
    setIds([])
    setIsModalVisible(false); // Close the modal without starting the timer
  };

  const renderImage = () => {
    if (hasCurrentMission) {
      return (
        <img
          src={YellowLed}
          width="50px"
          height="50px"
          alt={`${firstName} ${lastName}`}
          onClick={handleYellowImageClick}
        />
      );
    } else {
      if (!isActive) {
        return <div>دستگاه وصل نیست</div>;
      }
      if (hasConnection) {
        if (isClick) {
          return (
            <img
              src={GreenTick}
              width="50px"
              height="50px"
              alt={`${firstName} ${lastName}`}
              // onClick={handleImageClick}
            />
          );
        } else {
          return (
            <img
              src={GreenLed}
              width="50px"
              height="50px"
              alt={`${firstName} ${lastName}`}
              // onClick={handleImageClick}
            />
          );
        }
      } else {
        return (
          <img
            src={RedLed}
            width="50px"
            height="50px"
            alt={`${firstName} ${lastName}`}
            // onClick={handleImageClick}
          />
        );
      }
    }
  };



  console.log("hasConnectiohasConnectionn",ids);
  
  return (
    <>
      {/* <CustomButton onClick={handleOpenModal}>شروع عملیات</CustomButton> */}

      <Link
        to={`/dashboard/${id}`}
        className="DashboardCards"
        // onClick={() => setIsModalVisible(true)}
      >
        <div className="station-header">
          <h3>{name}</h3> {/* نام ایستگاه */}
        </div>
        <div style={{ marginTop: "8px" }} onClick={handleImageClick}>
          {renderImage()}
        </div>
        <p
          dir="ltr"
          style={{ margin: "4px 0 16px 0", fontSize: "1.2vw", whiteSpace: "nowrap" }}
          className="digital-clock"
        >
          {clockMission} {/* Display the current time */}
        </p>

        <div style={{ position: "absolute", bottom: 0, right: 16, fontFamily: "Vazir Digit" }}>
          {lastDailyMissionTime} {/* Mission number */}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 16, fontFamily: "Vazir Digit" }}>
          {dailyMissionCount} {/* Mission number */}
        </div>
      </Link>

      {/* Modal for confirmation */}
      <Modal
        showModal={isModalVisible}
        Submit={handleConfirm} // Start the timer when the user clicks "OK"
        closeModal={handleCancel} // Close the modal when the user clicks "Cancel"
        footer={<Button onClick={handleConfirm}>تایید</Button>}
        width="30vw"
      >
        <div>
          <h2>
            <i style={{ color: "#0089a7" }}>ایستگاه</i>
          </h2>
          {!hasCurrentMission ? (
            <p style={{ margin: "16px 0", fontSize: "2vw" }}>آیا از شروع عملیات اطمینان دارید؟</p>
          ) : (
            <p style={{ margin: "16px 0", fontSize: "2vw" }}>آیا از پایان عملیات اطمینان دارید؟</p>
          )}{" "}
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
const CustomButton = styled.button`
  background-color: rgb(205, 230, 233);
  color: black;
  padding: 4px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 16px;
  &:hover {
    background-color: rgb(243, 243, 243);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;
