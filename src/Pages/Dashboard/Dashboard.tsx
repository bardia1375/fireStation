import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RedLed from "../../assets/VideoIcon/redLed.png";
import GreenLed from "../../assets/VideoIcon/greenLed.png";
import YellowLed from "../../assets/VideoIcon/yellowLed.png";
import "./style.css";
import Modal from "Components/Modal/Modal";
// import { Button } from "Pages/Setting/Setting";
import serverApi from "Services/httpService";
import { Button } from "./Form/Form";

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
  const role = localStorage.getItem("role");

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
    setIsModalVisible(true);
  };

  // Confirm the operation and start the timer
  const handleConfirm = () => {
    setIsModalVisible(false); // Close the modal
    setIsTimerRunning(true); // Start the timer
    const data = {
      stationId: stationId,
    };
    console.log("اینجا هستیم");

    serverApi.post(`/Missions/StartMission?stationId=${data.stationId}`).then(res => {
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
          // onClick={handleImageClick}
        />
      );
    } else {
      if (!isActive) {
        return <div>دستگاه وصل نیست</div>;
      }
      if (hasConnection) {
        return (
          <img
            src={GreenLed}
            width="50px"
            height="50px"
            alt={`${firstName} ${lastName}`}
            // onClick={handleImageClick}
          />
        );
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

  return (
    <>
      <Link
        to={`/dashboard/${id}`}
        className="DashboardCards"
        onClick={() => setIsModalVisible(true)}
      >
        <div className="station-header">
          <h3>{name}</h3> {/* نام ایستگاه */}
        </div>
        <div style={{ marginTop: "8px" }}>{renderImage()}</div>
        <p
          dir="ltr"
          style={{ margin: "4px 0 16px 0", fontSize: "0.8vw", whiteSpace: "nowrap" }}
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
        showModal={!hasCurrentMission && hasConnection && isModalVisible && role !== "Watcher"}
        Submit={handleConfirm} // Start the timer when the user clicks "OK"
        closeModal={handleCancel} // Close the modal when the user clicks "Cancel"
        footer={<Button onClick={handleConfirm}>تایید</Button>}
        width="30vw"
      >
        <div>
          <h2>
            <i style={{ color: "#0089a7" }}>ایستگاه</i>
          </h2>
          <p style={{ margin: "16px 0", fontSize: "2vw" }}>آیا از شروع عملیات اطمینان دارید؟</p>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
