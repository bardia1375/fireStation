import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import light from "assets/General/Light.svg";
import serverApi, { setAuthToken } from "Services/httpService";
import LoadingSpinner from "../../Components/publicTable/loading/LoadingSpinner";
import { successMessage, errorMessage } from "../../Utils/commonFunctions";
import { startConnection } from "../../signalrService";
import Operation from "./Operation";

function DevicesList() {
  const [start, setStart] = useState(true);
  const [access, setAccess] = useState(true);
  const [end, setEnd] = useState(false);
  const [id, setId] = useState("");
  const [active, setActive] = useState(false);

  const [messages, setMessages] = useState(false);
  const [startMission, setStartMission] = useState([]);
  const [missionId, setMissionId] = useState(""); // State to hold missionId

  useEffect(() => {
    const connection = startConnection(handleReceiveMessage, canStartMission);

    return () => {
      // Cleanup on component unmount
      connection.stop();
    };
  }, []);

  const handleReceiveMessage = message => {
    console.log("1232342", message);

    if (message) {
      setActive(message);
    }
  };
  const canStartMission = missionId => {
    setMissionId(missionId); // Update missionId state
    localStorage.setItem("missionId", missionId); // Save missionId to localStorage
    setAccess(missionId);
    setStart(missionId);
  };
  // useEffect to save missionId to localStorage whenever it changes
  useEffect(() => {
    if (missionId) {
      localStorage.setItem("missionId", missionId);
    }
  }, [missionId]);
  console.log("activeactive", active);
  console.log("startMission", startMission);

  const fetchGetMissionById = missionId => {
    serverApi
      .get("Mission/GetMissionById", {
        params: {
          id: missionId,
        },
      })
      .then(res => {
        console.log("Mission details:", res.data);

        // Check if endTime is empty or false to stop the interval
        if (res.data.endTime !== "") {
          if (res.data.endTime !== "") {
            successMessage("عملیات متوقف شد");
          }
          setStart(false);
          console.log("Mission has ended. Stopping polling.");
        }
      })
      .catch(error => {
        console.error("Error fetching mission details:", error);
        // Optionally handle error
      });

    // Return interval ID for potential cleanup (though not necessary in this case)
  };

  const startOperation = () => {
    setStart(!start);
    serverApi
      .get("Mission/StartMission")
      .then(res => {
        const missionId = res.data;

        // Start polling for mission details
        // fetchGetMissionById(missionId);
      })
      .catch(error => {
        console.error("Error starting mission:", error);
        // Optionally handle error, e.g., set active to false or show an error message
      });
  };

  useEffect(() => {
    setAuthToken();
  }, []);

  // useEffect(() => {
  //   if (!access) {
  //       serverApi
  //         .get("Mission/CheckDeviceConnection")
  //         .then(res => setActive(res.data))
  //         .catch(error => {
  //           console.error("Error:", error);
  //           // Optionally handle error, e.g., set active to false or show an error message
  //         });

  //   } // Cleanup function to clear the interval on component unmount
  // }, [access]); // Empty dependency array ensures the effect runs only once on component mount
  // console.log("id2342", id);

  return (
    <Card>
      <Header active={active}></Header>
      <div></div>
    </Card>
  );
}

export default DevicesList;

export const Card = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Header = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: ${props => (props.active ? "#097969" : "red")};
`;
export const Button = styled.div`
  justify-content: space-between;
  gap: 10px;
  padding: 4px 12px;
  font-size: 50px;
  border-width: 2px;
  border-style: none;
  border-radius: 24px;
  box-shadow: 0px 7px 15px #00000033;
  white-space: nowrap;
  margin: auto 0;
  align-items: center;
  cursor: pointer;
  transition: 500ms;
  color: #fff;
  text-align: center;

  ${props => {
    switch (props.bg) {
      case "red":
        return css`
          background: red;
        `;
      case "blue":
        return css`
          background: blue;
        `;
      default:
        return css`
          background: green;
        `;
    }
  }}
  &:hover {
    transform: scale(0.7);
  }
`;
