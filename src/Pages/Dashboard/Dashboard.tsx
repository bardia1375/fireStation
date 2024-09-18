import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../assets/VideoIcon/redLed.png";
import "./style.css";
import Modal from "Components/Modal/Modal";
import { Button } from "Pages/Setting/Setting";
import serverApi from "Services/httpService";

const Dashboard = ({
  firstName,
  lastName,
  onEdit,
  missionNumber,
  initialClockMission,
  name,
  connect,
  setShowModal,
  dataLength,
  id,
}) => {
  const [clockMission, setClockMission] = useState(initialClockMission || "00 : 00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setClockMission(prevTime => {
          const [minutes, seconds] = prevTime.split(" : ").map(Number);
          const newSeconds = seconds + 1;
          const newMinutes = minutes + Math.floor(newSeconds / 60);
          const displaySeconds = newSeconds % 60;
          return `${String(newMinutes).padStart(2, "0")} : ${String(displaySeconds).padStart(
            2,
            "0"
          )}`;
        });
      }, 1000);
    }

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Show the modal on image click
  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  // Confirm the operation and start the timer
  const handleConfirm = () => {
    setIsModalVisible(false); // Close the modal
    setIsTimerRunning(true); // Start the timer
    const data = {
      stationId: "91229662-a96f-4cc1-c66e-08dcd7b7f551",
    };
    serverApi.post(`/Missions/StartMission?stationId=${data.stationId}`).then(res => {
      console.log("res", res.data);
    });
  };

  // Cancel the operation
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal without starting the timer
  };

  return (
    <>
      <Link to={`/dashboard/${id}`} className="DashboardCards" onClick={onEdit}>
        <div className="station-header">
          <h3>{name}</h3> {/* نام ایستگاه */}
        </div>
        <div>
          <img
            src={imgUrl}
            width="50px"
            height="50px"
            alt={`${firstName} ${lastName}`}
            onClick={handleImageClick} // Show modal on image click
          />
        </div>
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
        title="شروع عملیات"
        showModal={isModalVisible}
        Submit={handleConfirm} // Start the timer when the user clicks "OK"
        closeModal={handleCancel} // Close the modal when the user clicks "Cancel"
        footer={<Button onClick={handleConfirm}>تایید</Button>}
      >
        <p>آیا از شروع عملیات اطمینان دارید؟</p>
      </Modal>
    </>
  );
};

export default Dashboard;
