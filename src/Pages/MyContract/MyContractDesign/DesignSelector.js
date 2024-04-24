import React, { useState, useEffect, useRef } from "react";
import "./MyContractDesign.css";
import { useHistory } from "react-router-dom";

// import './style/GlobalStyle.css';
import Header from "../../../assets/contract/design-column-header.svg";
import { ReactComponent as HoveredIcon } from "../../../assets/contract/design-column-header-hover.svg";
import SelectedIcon from "../../../assets/contract/design-selected-icon.svg";
import enable from "../../../assets/contract/design-enable.svg";
import disable from "../../../assets/contract/design-disable.svg";
import styled from "@emotion/styled";
import QuestionMark from "../../../assets/contract/questionmark.svg";
import { array } from "i/lib/util";
import { setAuthToken } from "../../../Services/httpService";

function DesignSelector({
  id,
  price,
  planName,
  itemsContract,
  func,
  funcId,
  check,
  managePlan,
  contracts,
  setRefGet,
  onPress,
  setPrice,
  boxShadow,
  setContractDesign,
}) {
  const [activeObject, setActiveObject] = useState(false);
  const [plansItem, setPlansItem] = useState(itemsContract);
  const [idx, setIdx] = useState(null);
  const history = useHistory();
  // const [managePlan, setManagePlan] = useState(false);
  useEffect(() => {
    setAuthToken();
  }, []);
  const handleSoftwareList = e => {
    // e.preventDefault();
    setActiveObject(!activeObject);
    funcId(e);
    func(true);
    setIdx(e);
  };

  useEffect(() => {
    const handleSoftwareList = e => {
      // e.preventDefault();
      setActiveObject(!activeObject);
      funcId(e);
      func(false);
      setIdx(e);
    };
  }, [idx]);

  const [selected, setSelected] = useState({ name: "", status: "" });
  const [hovered, setHovered] = useState("");

  const selectiveHandler = (name, id, price) => {
    if (selected.name === name && selected.status === "selected") {
      setSelected({ name: "", status: "" });
      func(false);
      onPress(null);
      funcId(null);
      setPrice(0);
    } else {
      setSelected({ name: name, status: "selected" });
      func(true);
      funcId(id);
      onPress(id);
      setPrice(price);
    }
  };
  const overHandler = name => {
    if (selected.status !== "selected") {
      setSelected({ name: name, status: "hovered" });
    }
  };
  const leaveHandler = () => {
    if (selected.status === "hovered") {
      setSelected({ name: "", status: "" });
    }
  };
  const [indexOfItem, setIndexOfItem] = useState([]);
  const [hoverDetail, setHoverDetail] = useState("");

  const x = contracts.map(item => JSON.parse(item.Items));
  const ContractItems = x.map(item => item.map(tet => Object.values(tet)));

  return (
    <div className="designBody">
      <div className="designHeader">
        <div style={{ width: "30%", marginRight: "100px" }}>خدمات</div>
        {contracts?.map((item, index) => (
          <div
            onClick={() => selectiveHandler(item.PlanName, item.Id, item.Price)}
            onMouseEnter={() => overHandler(item.PlanName)}
            onMouseLeave={leaveHandler}
            style={{
              cursor: "pointer",
              position: "absolute",
              left: `${index * 120 + 20}px`,
              top: 24,
            }}
          >
            {selected.name === item.PlanName && selected.status === "selected" ? (
              <img
                src={SelectedIcon}
                alt={"SelectedIcon"}
                width={45}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  // width: '80px',
                  zIndex: "1",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : selected.name === item.PlanName && selected.status === "hovered" ? (
              <HoveredIcon
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  width: "80px",
                  zIndex: "1",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              <img
                src={Header}
                alt={"Header"}
                width={45}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  // width: '80px',
                  zIndex: "1",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            <div
              style={{
                backgroundColor: `${
                  selected.name === item.PlanName && selected.status === "selected"
                    ? "#3AAFBC"
                    : "white"
                }`,
              }}
              className={`designColumn ${!boxShadow ? "boxshadow" : "border"}`}
            >
              <span
                style={{
                  color: `${
                    selected.name === item.PlanName && selected.status === "selected"
                      ? "white"
                      : selected.name === item.PlanName && selected.status === "hovered"
                      ? "#FF5454"
                      : "#6FD8DC"
                  }`,
                  position: "absolute",
                  top: "25px",
                  whiteSpace: "nowrap",
                  zIndex: "1",
                }}
              >
                {item.PlanName}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  marginTop: "50px",
                }}
              >
                {ContractItems[index].map((status, index) =>
                  status[0] === true ? (
                    <img
                      style={{
                        backgroundColor: `${
                          selected.name === item.PlanName && selected.status === "selected"
                            ? "white"
                            : "#F8F7F7"
                        }`,
                        width: "20px",
                        height: "20px",
                        padding: "1px",
                        borderRadius: "100%",
                      }}
                      src={enable}
                      alt="enable"
                    />
                  ) : status[0] === false ? (
                    <img
                      style={{
                        backgroundColor: `${
                          selected.name === item.PlanName && selected.status === "selected"
                            ? "white"
                            : "#F8F7F7"
                        }`,
                        width: "20px",
                        height: "20px",
                        padding: "1px",
                        borderRadius: "100%",
                      }}
                      src={disable}
                      alt="disable"
                    />
                  ) : (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        padding: "1px",
                        borderRadius: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        color: "gray",
                        // letterSpacing: '-1px',
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span>{status[0]}</span>
                    </div>
                  )
                )}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="designTitles" id={`${id}`}>
        {plansItem?.map((plan, index) => (
          <div
            className="designItems"
            style={{
              padding: "10px",
              backgroundColor: `${index % 2 == 0 ? "#F5F5F5" : "white"}`,
            }}
          >
            {plan?.Description !== null && (
              <div
                style={{
                  position: "relative",
                  paddingTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <QuestionIcon
                  src={QuestionMark}
                  alt={"QuestionMark"}
                  // onClick={() => {}}
                  onMouseEnter={setHoverDetail.bind(null, plan.Title)}
                  onMouseLeave={setHoverDetail.bind(null, "")}
                />
                {hoverDetail === plan.Title && (
                  <HelpMessage>
                    <span>{plan?.Description ? plan?.Description : "شرح خدمات"}</span>
                  </HelpMessage>
                )}
              </div>
            )}
            <h3
              style={{
                width: "34%",
                fontWeight: "600",
                fontSize: "1.2vw",
              }}
            >
              {plan.Title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignSelector;

export const QuestionIcon = styled.img`
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;

export const HelpMessage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  right: 20px;
  width: 400px;
  & > span {
    width: 100%;
    background-color: #ccc;
    padding: 0 5px;
    padding-top: 5px;
    border-radius: 20px;
    z-index: 1;
  }
`;
