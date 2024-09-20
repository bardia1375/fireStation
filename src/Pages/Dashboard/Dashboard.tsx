import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RedLed from "../../assets/VideoIcon/redLed.png";
import GreenLed from "../../assets/VideoIcon/greenLed.png";
import YellowLed from "../../assets/VideoIcon/yellowLed.png";
import "./style.css";
import Modal from "Components/Modal/Modal";
import { Button } from "Pages/Setting/Setting";
import serverApi from "Services/httpService";

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
  id,
}) => {
  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  };
  // Initialize clockMission based on whether a current mission exists
  const [clockMission, setClockMission] = useState(
    hasCurrentMission ? formatTime(currentMissionDuration) : "00 : 00"
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Utility function to format time from seconds to "MM : SS"

  useEffect(() => {
    let timer;

    if (isTimerRunning || hasCurrentMission) {
      timer = setInterval(() => {
        setClockMission(prevTime => {
          const [minutes, seconds] = prevTime.split(" : ").map(Number);
          const totalSeconds = minutes * 60 + seconds + 1; // 1 second ahead
          return formatTime(totalSeconds);
        });
      }, 1000);
    }

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [isTimerRunning, hasCurrentMission]);

  // Show the modal on image click
  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  // Confirm the operation and start the timer
  const handleConfirm = () => {
    setIsModalVisible(false); // Close the modal
    setIsTimerRunning(true); // Start the timer
    const data = {
      stationId: stationId,
    };
    serverApi.post(`/تستMissions/StartgMission?stationId=${data.stationId}`).then(res => {
      console.log("res", res.data);
    });
  };

  // Cancel the operation
  const handleCancel = () => {
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
          onClick={handleImageClick} // Show modal on image click
        />
      );
    } else {
      if (hasConnection) {
        return (
          <img
            src={GreenLed}
            width="50px"
            height="50px"
            alt={`${firstName} ${lastName}`}
            onClick={handleImageClick} // Show modal on image click
          />
        );
      } else {
        return (
          <img
            src={RedLed}
            width="50px"
            height="50px"
            alt={`${firstName} ${lastName}`}
            onClick={handleImageClick} // Show modal on image click
          />
        );
      }
    }
  };

  return (
    <>
      <Link to={`/dashboard/${id}`} className="DashboardCards" onClick={onEdit}>
        <div className="station-header">
          <h3>{name}</h3> {/* نام ایستگاه */}
        </div>
        <div>{renderImage()}</div>
        <p
          dir="ltr"
          style={{ margin: "4px 0 16px 0", fontSize: "0.8vw", whiteSpace: "nowrap" }}
          className="digital-clock"
        >
          {clockMission} {/* Display the current time */}
        </p>
        <div style={{ position: "absolute", bottom: 0, right: 16, fontFamily: "Vazir Digit" }}>
          {missionNumber} {/* Mission number */}
        </div>
      </Link>

      {/* Modal for confirmation */}
      <Modal
        showModal={!hasCurrentMission && hasConnection && isModalVisible}
        Submit={handleConfirm} // Start the timer when the user clicks "OK"
        closeModal={handleCancel} // Close the modal when the user clicks "Cancel"
        footer={<Button onClick={handleConfirm}>تایید</Button>}
        width="30vw"
      >
        <div>
          <h2>
            <i style={{ color: "#0089a7" }}>پرسنل</i>
          </h2>
          <p style={{ margin: "16px 0", fontSize: "2vw" }}>آیا از شروع عملیات اطمینان دارید؟</p>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
