import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "./style.css";
import serverApi from "Services/httpService";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { editStationData, postStationData } from "../Services/services";
import { getSettingData } from "Services/services";
import { useAppContext } from "Context/AppContext";

function Form({ getData, setShowModal, mockData, oneStationSetting, deviceState }) {
  const queryClient = useQueryClient(); // دریافت instance از queryClient
  console.log("deviceStatdeviceStatee", deviceState);
  console.log("oneStationSetting", oneStationSetting);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["qualityTime"], // کلید یکتا برای کوئری
    queryFn: getSettingData,
  });
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [isHasCurrentMission, setIsHasCurrentMission] = useState();
  const [isActive, setIsActive] = useState("غیرفعال");
  const [priority, setPriority] = useState("");
  const [role, setRole] = useState("");
  const [ip, setIp] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const data = deviceState.filter(item => {
      return item?.id === id;
    })[0];
    setIsHasCurrentMission(data?.hasCurrentMission);
  }, [deviceState]);

  const [stationFilter, setStationFilter] = useState();
  const { setShowPingModal, showPingModal } = useAppContext();
  const [items, setItems] = useState<{ name: string; seconds: number; toSeconds: number }[]>([]);
  useEffect(() => {
    const filter = deviceState.filter(el => {
      return el.id === id;
    });
    console.log("filterbardia", filter);
    if (filter.length !== 0) {
      setStationFilter(filter[0]);
    }
  }, []);

  // useEffect(() => {
  //   setItems([
  //     { name: data.firstStage, seconds: 0, toSeconds: 60 },
  //     { name: data.secondStage, seconds: 0, toSeconds: 60 },
  //     { name: data.thirdStage, seconds: 0, toSeconds: 60 },
  //     { name: data.fourthStage, seconds: 0, toSeconds: 60 },
  //     { name: data.fifthStage, seconds: 0, toSeconds: 60 },
  //   ]);
  // }, [data]);
  console.log("stationFilter", stationFilter);

  const handleInputChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const params = useParams();
  console.log("params", params);
  useEffect(() => {
    setName(stationFilter?.name);
    setPort(stationFilter?.port);
    setIsActive(stationFilter?.isActive ? "فعال" : "غیرفعال");
    setPriority(stationFilter?.priority);
    setRole(stationFilter?.role);
    setIp(stationFilter?.ip);
    setItems([
      {
        name: data?.firstStage,
        seconds: oneStationSetting?.stepOneFromTime,
        toSeconds: oneStationSetting?.stepOneToTime,
      },
      {
        name: data?.secondStage,
        seconds: oneStationSetting?.stepTwoFromTime,
        toSeconds: oneStationSetting?.stepTwoToTime,
      },
      {
        name: data?.thirdStage,
        seconds: oneStationSetting?.stepThreeFromTime,
        toSeconds: oneStationSetting?.stepThreeToTime,
      },
      {
        name: data?.fourthStage,
        seconds: oneStationSetting?.stepFourFromTime,
        toSeconds: oneStationSetting?.stepFourToTime,
      },
      {
        name: data?.fifthStage,
        seconds: oneStationSetting?.stepFiveFromTime,
        toSeconds: oneStationSetting?.stepFiveToTime,
      },
    ]);
  }, [stationFilter, oneStationSetting]);
  const handleAccessSwitch = type => {
    setRole(prev => {
      if (prev === type) {
        return;
      }
      return type;
    });
    // setAccessType(type);
  };

  const { mutate } = useMutation({
    mutationKey: ["postStationData"],
    mutationFn: postStationData,
    onSuccess: () => {
      setShowModal(false);
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["users"]);
      const multipleItem = {
        stationId: reza.id,
        stepOneFromTime: items[0].seconds,
        stepOneToTime: items[0].toSeconds,
        stepTwoFromTime: items[1].seconds,
        stepTwoToTime: items[1].toSeconds,
        stepThreeFromTime: items[2].seconds,
        stepThreeToTime: items[2].toSeconds,
        stepFourFromTime: items[3].seconds,
        stepFourToTime: items[3].toSeconds,
        stepFiveFromTime: items[4].seconds,
        stepFiveToTime: items[4].toSeconds,
      };
      serverApi.post("Stations/UpsertStationSettings", multipleItem);

      setShowModal(false);
    },
  });
  const { mutate: EditMutate, data: reza } = useMutation({
    mutationKey: ["editStationData"],
    mutationFn: editStationData,
    onSuccess: () => {
      const multipleItem = {
        stationId: id,
        stepOneFromTime: items[0].seconds,
        stepOneToTime: items[0].toSeconds,
        stepTwoFromTime: items[1].seconds,
        stepTwoToTime: items[1].toSeconds,
        stepThreeFromTime: items[2].seconds,
        stepThreeToTime: items[2].toSeconds,
        stepFourFromTime: items[3].seconds,
        stepFourToTime: items[3].toSeconds,
        stepFiveFromTime: items[4].seconds,
        stepFiveToTime: items[4].toSeconds,
      };
      setShowModal(false);
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["stations"]);
      serverApi.post("Stations/UpsertStationSettings", multipleItem);

      setShowModal(false);
    },
  });
  const submit = async () => {
    if (false) {
      errorMessage("لطفا تمام فیدها پر شود!");
      return;
    }

    if (id) {
      const data = {
        id: id,
        name,
        port,
        isActive: isActive == "فعال" ? true : false,
        priority,
        ip,
      };
      console.log("paramsfsdfsdfid", data);
      const multipleItem = {
        stationId: id,
        stepOneFromTime: items[0].seconds,
        stepOneToTime: items[0].toSeconds,
        stepTwoFromTime: items[1].seconds,
        stepTwoToTime: items[1].toSeconds,
        stepThreeFromTime: items[2].seconds,
        stepThreeToTime: items[2].toSeconds,
        stepFourFromTime: items[3].seconds,
        stepFourToTime: items[3].toSeconds,
        stepFiveFromTime: items[4].seconds,
        stepFiveToTime: items[4].toSeconds,
      };

      if (!isHasCurrentMission) {
        await EditMutate(data);
      } else {
        errorMessage(
          "دستگاه موردنظر در حال ماموریت است.لطفا تا پایان ماموریت صبر کنید یا ماموریت نرم افزار را خاتمه دهید"
        );
      }
      // serverApi.post("Stations/UpsertStationSettings", multipleItem);
    } else {
      const data = {
        name,
        port,
        isActive: isActive == "فعال" ? true : false,
        priority,
        ip,
      };
      console.log("paramsfsdfsdfid", data);

      mutate(data);
    }

    // getData(data);
  };

  const onclose = () => {
    setShowModal(false);
  };
  return (
    <Card>
      <div className="mahi_holder" style={{ width: "100%" }}>
        <div className="container">
          <div style={{ color: "#04165d" }} className="row bg_3">
            <h2>
              <i style={{ color: "#0089a7", fontSize: "1em" }}>ایستگاه‌ها</i>
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div className="col-3 ">
                <label>نام</label>
                <div>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="effect-21"
                    type="text"
                    placeholder="نام"
                  />
                  {/* <span className="focus-border">
                    <i></i>
                  </span> */}
                </div>
              </div>

              <div className="col-3 ">
                <label>ip</label>

                <input
                  value={ip}
                  onChange={e => setIp(e.target.value)}
                  className="effect-21"
                  type="string"
                  placeholder="آی پی دستگاه"
                />
                {/* <span className="focus-border">
                  <i></i>
                </span> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div className="col-3 ">
                <label>اولویت</label>{" "}
                <input
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="effect-21"
                  type="number"
                  placeholder="اولویت"
                  width={"500px"}
                />
                {/* <span className="focus-border">
                  <i></i>
                </span> */}
              </div>
              <div className="col-3 ">
                <label>port</label>{" "}
                <input
                  value={port}
                  onChange={e => setPort(e.target.value)}
                  className="effect-21"
                  type="number"
                  placeholder="پورت"
                  width={"500px"}
                />
                {/* <span className="focus-border">
                  <i></i>
                </span> */}
              </div>
            </div>
            <div className="col-3">
              <AccessLabel>وضعیت:</AccessLabel>
              <div style={{ display: "flex", padding: "0 4vw" }}>
                <label>فعال</label>
                <SwitchContainer>
                  <SwitchInput
                    type="checkbox"
                    checked={isActive === "فعال"}
                    onChange={() => setIsActive(prev => (prev === "فعال" ? "غیرفعال" : "فعال"))}
                  />
                  <Slider />
                </SwitchContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {id && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0 32px" }}>
          {items.map((item, index) => (
            <div key={index} className="col-3 input-effect" style={{}}>
              <h4>{item.name}</h4>
              <div className=" input-effect" style={{ display: "flex" }}>
                <input
                  type="number"
                  className="effect-21"
                  value={item.seconds}
                  onChange={e =>
                    handleInputChange(
                      index,
                      "seconds",
                      Math.max(0, Math.min(1000, +e.target.value))
                    )
                  }
                  min="0"
                  max="1000"
                />
                <input
                  type="number"
                  className="effect-21"
                  value={item.toSeconds}
                  onChange={e =>
                    handleInputChange(
                      index,
                      "toSeconds",
                      Math.max(0, Math.min(1000, +e.target.value))
                    )
                  }
                  min="0"
                  max="1000"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ width: "100%", display: "flex", gap: "4px" }}>
        {/* <Button bg="blue" style={{ width: "60px" }} onClick={() => setShowPingModal(true)}>
          لاگ
        </Button> */}
        {/* <Button bg="blue" style={{ width: "60px" }} onClick={submit}>
          پینگ
        </Button> */}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Button className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
          ثبت
        </Button>
        <Link
          to="/stations"
          className="col-3 input-effect"
          style={{ width: "10vw" }}
          onClick={onclose}
        >
          انصراف
        </Link>
      </div>
    </Card>
  );
}

export default Form;

// Switch Styling Components
// Styled Components
const SwitchRow = styled.div`
  display: flex;
  justify-content: space-between; /* سوییچ‌ها به صورت افقی و با فاصله */
  align-items: center;
`;

const AccessLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin: 4px;
  text-align: right;
`;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 8px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196f3;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

// Styled Button
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.div`
  justify-content: space-between;
  gap: 10px;
  padding: 4px 12px;
  font-size: 20px;
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
  width: 100%;
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
          background: #0089a7;
        `;
    }
  }}
  &:hover {
    transform: scale(0.9);
  }
`;
