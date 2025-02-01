import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "./style.css";
import serverApi from "Services/httpService";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { editUserData } from "../Services/services";

function Form({ getData, setShowModal, mockData, oneUser }) {
  const queryClient = useQueryClient(); // دریافت instance از queryClient

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState("غیرفعال");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "Admin", "systemUser", "regularUser"
  const [userName, setUsername] = useState(""); // "Admin", "systemUser", "regularUser"
  const params = useParams();
  console.log("params", params);
  useEffect(() => {
    setFirstName(oneUser?.firstName);
    setLastName(oneUser?.lastName);
    setIsActive(oneUser?.isActive ? "فعال" : "غیرفعال");
    setPassword(oneUser?.password);
    setRole(oneUser?.role);
    setUsername(oneUser?.userName);
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
      lastName,
      isActive: isActive ? true : false,
      password,
      role,
      userName,
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
    mutationKey: ["postUserData"],
    mutationFn: postUserData,
    onSuccess: () => {
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["users"]);
      setShowModal(false);
    },
  });
  const { mutate: EditMutate } = useMutation({
    mutationKey: ["editUserData"],
    mutationFn: editUserData,
    onSuccess: () => {
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["users"]);
      setShowModal(false);
    },
  });
  const submit = () => {
    if (!firstName || !lastName || !isActive || !password || !role || !userName) {
      errorMessage("لطفا تمام فیدها پر شود!");
      return;
    }
    if (params.id) {
      const data = {
        id: params.id,
        firstName,
        lastName,
        isActive,
        password,
        role,
        userName,
      };
      EditMutate(data);
    } else {
      const data = {
        firstName,
        lastName,
        isActive,
        password,
        role,
        userName,
      };
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
              <i style={{ color: "#0089a7" }}>پرسنل</i>
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
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="نام خانوادگی"
              />
              <label>نام خانوادگی</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              <input
                value={userName}
                onChange={e => setUsername(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="نام کاربری"
              />
              <label>نام کاربری</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              {" "}
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="effect-21"
                type="password"
                placeholder="رمز عبور"
                width={"500px"}
              />
              <label>First Name</label>
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
            {/* Custom Switches */}
            <div className="col-3">
              <AccessLabel>دسترسی:</AccessLabel> {/* لیبل مرجع */}
              <SwitchRow style={{ padding: "0 4vw" }}>
                <div>
                  <label>مدیر</label>
                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={!!role}
                      onChange={() => handleAccessSwitch("Admin")}
                    />
                    <Slider />
                  </SwitchContainer>
                </div>

                <div>
                  <label>کاربر سامانه</label>
                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={role === "systemUser"}
                      onChange={() => handleAccessSwitch("systemUser")}
                    />
                    <Slider />
                  </SwitchContainer>
                </div>

                <div>
                  <label>کاربر عادی</label>
                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={role === "regularUser"}
                      onChange={() => handleAccessSwitch("regularUser")}
                    />
                    <Slider />
                  </SwitchContainer>
                </div>
              </SwitchRow>
            </div>
          </div>
        </div>
      </div>{" "}
      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "8px" }}>
        <Button className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
          ثبت
        </Button>
        <Link
          to="/personnel"
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
