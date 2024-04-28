import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/publicTable/loading/LoadingSpinner";
import serverApi from "Services/httpService";
import styled, { css } from "styled-components";

function Operation({ setStart, start }) {
  const [test, setTest] = useState();
  useEffect(() => {
    const missionFromStorage = localStorage.getItem("missionId");
    setTest(missionFromStorage);
    console.log("missionFromStorage", missionFromStorage);
  }, [start]);

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
  console.log("ttestest", test);

  return (
    <>
      {test ? (
        <Button onClick={startOperation} bg={"blue"}>
          <div> شروع عملیات</div>
        </Button>
      ) : (
        <Button bg={"blue"}>
          <LoadingSpinner />
        </Button>
      )}
    </>
  );
}

export default Operation;
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
