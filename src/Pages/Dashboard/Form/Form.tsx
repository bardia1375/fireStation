import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "./style.css";
import serverApi from "Services/httpService";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { editStationData, editUserData, postStationData } from "../Services/services";

function Form({ getData, setShowModal, mockData, oneUser }) {
  const queryClient = useQueryClient(); // دریافت instance از queryClient

  const [firstName, setFirstName] = useState("");
  const [port, setPort] = useState("");
  const [isActive, setIsActive] = useState("غیرفعال");
  const [priority, setPriority] = useState("");
  const [role, setRole] = useState("");
  const [ip, setIp] = useState("");
  const [items, setItems] = useState([
    { name: "عالی", seconds: 0, toSeconds: 60 },
    { name: "خوب", seconds: 0, toSeconds: 60 },
    { name: "متوسط", seconds: 0, toSeconds: 60 },
    { name: "بد", seconds: 0, toSeconds: 60 },
    { name: "خیلی بد", seconds: 0, toSeconds: 60 },
  ]);

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
    setFirstName(oneUser?.firstName);
    setPort(oneUser?.port);
    setIsActive(oneUser?.isActive ? "فعال" : "غیرفعال");
    setPriority(oneUser?.priority);
    setRole(oneUser?.role);
    setIp(oneUser?.ip);
  }, [oneUser]);
  const handleAccessSwitch = type => {
    setRole(prev => {
      if (prev === type) {
        return;
      }
      return type;
    });
    // setAccessType(type);
  };
  const postUserData = () => {
    const data = {
      firstName,
      port,
      isActive: isActive ? true : false,
      priority,
      role,
      ip,
    };

    return serverApi
      .post("/UserManagement/CreateUser", data)
      .then(res => {
        if (res.data) {
          successMessage("عملیات با موفقیت انجام شد.");
        } else {
          errorMessage("عملیات با شکست مواجه شد!");
        }
      })
      .catch(() => {
        errorMessage("عملیات با شکست مواجه شد!");
      });
  };

  const { mutate, isError, isLoading } = useMutation({
    mutationKey: ["postStationData"],
    mutationFn: postStationData,
    onSuccess: () => {
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["users"]);
      setShowModal(false);
    },
  });
  const { mutate: EditMutate } = useMutation({
    mutationKey: ["editStationData"],
    mutationFn: editStationData,
    onSuccess: () => {
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["dashboard"]);
      setShowModal(false);
    },
  });
  const submit = () => {
    if (!firstName || !port || !isActive || !priority || !ip) {
      errorMessage("لطفا تمام فیدها پر شود!");
      return;
    }

    if (params.id) {
      const data = {
        id: params.id,
        firstName,
        port,
        isActive,
        priority,
        role,
        ip,
        items,
      };
      console.log("paramsfsdfsdfid", data);

      EditMutate(data);
    } else {
      const data = {
        firstName,
        port,
        isActive,
        priority,
        role,
        ip,
        items,
      };
      console.log("paramsfsdfsdfid", data);

      mutate(data);
    }

    getData(data);
  };

  const onclose = () => {
    setShowModal(false);
  };
  return (
    <Card>
      <div className="mahi_holder">
        <div className="container">
          <div style={{ color: "#04165d" }} className="row bg_3">
            <h2>
              <i style={{ color: "#0089a7", fontSize: "1em" }}>ایستگاه‌ها</i>
            </h2>

            <div className="col-3 input-effect">
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="نام"
              />
              <label>نام</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              <input
                value={ip}
                onChange={e => setIp(e.target.value)}
                className="effect-21"
                type="number"
                placeholder="آی پی دستگاه"
              />
              <label>ip:</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              {" "}
              <input
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="effect-21"
                type="number"
                placeholder="اولویت"
                width={"500px"}
              />
              <label>اولویت</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
            <div className="col-3 input-effect">
              {" "}
              <input
                value={port}
                onChange={e => setPort(e.target.value)}
                className="effect-21"
                type="number"
                placeholder="پورت"
                width={"500px"}
              />
              <label>port:</label>
              <span className="focus-border">
                <i></i>
              </span>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr " }}>
        {items.map((item, index) => (
          <div
            key={index}
            className="col-3 input-effect"
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <h4>{item.name}</h4>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                className="effect-21"
                value={item.seconds}
                onChange={e =>
                  handleInputChange(index, "seconds", Math.max(0, Math.min(60, +e.target.value)))
                }
                min="0"
                max="100"
              />
              <input
                type="number"
                className="effect-21"
                value={item.toSeconds}
                onChange={e =>
                  handleInputChange(index, "toSeconds", Math.max(0, Math.min(60, +e.target.value)))
                }
                min="0"
                max="100"
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
        <Button className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
          ثبت
        </Button>
        <Link
          to="/dashboard"
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
