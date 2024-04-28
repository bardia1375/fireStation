import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import light from "assets/General/Light.svg";
import "./setting.css";
import serverApi from "Services/httpService";
import { successMessage, errorMessage } from "Utils/commonFunctions";

function DevicesList() {
  const [start, setStart] = useState(false);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    serverApi.get("Setting/GetSetting").then(res => {
      console.log("ressdfsdf", res);
      setIp(res.data.deviceIp);
      setPort(res.data.devicePort);
      setPhone(res.data.phoneNumber);
    });
  }, []);
  const submit = () => {
    const data = {
      phoneNumber: phone,
      ip: ip,
      port: port,
    };
    if (phone && ip && port) {
      serverApi.post("Setting/UpsertSetting", data).then(res => {
        if (res.data) {
          successMessage("عملیات با موفقیت انجام شد.");
        } else {
          errorMessage("عملیات با شکست مواجه شد!");
        }
      });
    } else {
      errorMessage("لطفا تمام فیدها پر شود!");
    }
  };
  return (
    <Card>
      <div className="mahi_holder">
        <div className="container">
          <div style={{ color: "#04165d" }} className="row bg_3">
            <h2>
              <i style={{ color: "#0089a7" }}>تنظیمات</i>
            </h2>

            <div className="col-3 input-effect">
              <input
                value={ip}
                onChange={e => setIp(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="ip دستگاه"
                width={"500px"}
              />
              <label>First Name</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              <input
                value={port}
                onChange={e => setPort(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="پورت دستگاه"
                width={"500px"}
              />
              <label>First Name</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <div className="col-3 input-effect">
              {" "}
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="effect-21"
                type="text"
                placeholder="شماره پیامک"
                width={"500px"}
              />
              <label>First Name</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>

            <Button className="col-3 input-effect" onClick={submit}>
              ثبت
            </Button>
          </div>
        </div>
      </div>
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
  background-color: #097969;
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
