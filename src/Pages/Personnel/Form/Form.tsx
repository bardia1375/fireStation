import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import "./style.css";
import serverApi from "Services/httpService";
import { successMessage, errorMessage } from "Utils/commonFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import { editUserData } from "../Services/services";
import Permissions from "./Permissions/Permissions";

function Form({ getData, setShowModal, mockData, oneUser }) {
  const queryClient = useQueryClient(); // دریافت instance از queryClient

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState("غیرفعال");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "Admin", "systemUser", "regularUser"
  const [userName, setUsername] = useState(""); // "Admin", "systemUser", "regularUser"
  const params = useParams();

  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const preselectedRoutes = [
    "/BaseSettings/Upsert",
    "/BaseSettings/GetBaseSetting",
    "/DeviceRelays/Upsert",
    "/DeviceRelays/GetDeviceRelay",
    "/Missions/StartMission",
    "/Missions/GroupStartMission",
    "/Missions/StopMission",
    "/Missions/MissionReport",
  ];
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>(() =>
    preselectedRoutes.reduce((acc, route) => {
      acc[route] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );



  const [errors, setErrors] = useState({ userName: "", password: "" });

  const history = useHistory();
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
      history.push("/personnel");
      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
      queryClient.invalidateQueries(["users"]);
      setShowModal(false);
    },
  });
  const { mutate: EditMutate, data } = useMutation({
    mutationKey: ["editUserData"],
    mutationFn: editUserData,
    onSuccess: responseData => {
      history.push("/personnel");
      console.log("Data from mutation:", responseData);
      if (!responseData.isSuccess) {
        errorMessage("نام کاربری وارد شده تکراری است");
      } else {
        successMessage("عملیات با موفقیت انجام شد");
        setShowModal(false);
        queryClient.invalidateQueries(["users"]);
      }

      // پس از موفقیت در mutate، کوئری با کلید "users" مجدداً بازآوری می‌شود
    },
    onError: () => {
      console.log("sdfsdfs", data);
    },
  });
  const validateForm = () => {
    const newErrors = { userName: "", password: "" };

    // Validate password: should be at least 6 characters and English
    if (!/^[a-zA-Z0-9!@#$%^&*()_+={}[\]|\\:;"'<>,.?/]+$/.test(password) || password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل 6 کاراکتر و شامل حروف انگلیسی باشد.";
      errorMessage(newErrors.password);
    }
    //  console.log("newErrors");

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  }; // تابع برای مدیریت تغییر وضعیت چک‌باکس‌ها

  const submit = () => {
    const selectedRoutes = [
      ...preselectedRoutes,
      ...Object.keys(selectedCheckboxes).filter(key => selectedCheckboxes[key]),
    ];
    console.log("Routes to send:", selectedRoutes);

    // ارسال داده‌ها
    console.log("Selected Routes for Submit:", selectedRoutes);
    // بررسی اینکه فیلدهای اجباری پر شده باشند
    if (!firstName || !lastName || !isActive || !role || !userName) {
      errorMessage("لطفا تمام فیلدها پر شود!");
      return;
    }

    // اعتبارسنجی پسورد اگر وجود داشته باشد
    if (password && password.length < 6) {
      errorMessage("پسورد ورودی حداقل باید 6 کاراکتر داشته باشد");
      return;
    }

    // پیام خطا اگر کاربر بخواهد پسورد جدیدی ثبت کند ولی هنوز دکمه ثبت رمز کلیک نشده باشد
    if (password && params.id) {
      errorMessage("اگر میخواهید رمز جدیدی ثبت کنید ابتدا باید بر روی دکمه ثبت رمز کلیک کنید");
      return;
    }

    // داده‌ها برای ویرایش کاربر
    if (params.id) {
      const data = {
        id: params.id,
        firstName,
        lastName,
        isActive: isActive === "فعال" ? true : false,
        role,
        userName,
      };
      EditMutate(data); // ارسال داده‌ها به تابع ویرایش
    } else {
      // اگر پسورد وجود نداشته باشد و در حال ایجاد کاربر جدید هستیم
      if (!password) {
        errorMessage("لطفا پسورد را وارد کنید!");
        return;
      } else {
        const data = {
          firstName,
          lastName,
          isActive: isActive === "فعال" ? true : false,
          password,
          role,
          userName,
        };

        mutate(data); // ارسال داده‌ها به تابع ایجاد کاربر
      }
    }

    getData(data); // نمایش داده‌ها
  };

  const onclose = () => {
    setShowModal(false);
  };
  const handlePassword = () => {
    if (!validateForm()) {
      return; // Do not proceed if validation fails
    }
    const data = {
      id: params.id,
      password: password,
    };
    serverApi.post("/UserManagement/ChangePassword", data).then(res => {
      console.log("r12312es", res);

      successMessage("عملیات با موفقیت انجام شد");
    });
    setPassword("");
  };
  const handleRoleChange = e => {
    setRole(e.target.value);
  };

  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpanded(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };



  return (
    <Card>
      <div className="mahi_holder" style={{ width: "100%" }}>
        <div className="container">
          <div style={{ color: "#04165d" }} className="row bg_3">
            <h2>
              <i style={{ color: "#0089a7" }}>پرسنل</i>
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div className="col-3 input-effect">
                {" "}
                <label>نام</label>
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="effect-21"
                  type="text"
                  placeholder="نام"
                />
                {/* <span className="focus-border">
                  <i></i>
                </span> */}
              </div>

              <div className="col-3 input-effect">
                {" "}
                <label>نام خانوادگی</label>
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="effect-21"
                  type="text"
                  placeholder="نام خانوادگی"
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
              <div className="col-3 input-effect">
                {" "}
                <label>نام کاربری</label>
                <input
                  value={userName}
                  onChange={e => setUsername(e.target.value)}
                  className="effect-21"
                  type="text"
                  placeholder="نام کاربری"
                />
                {/* <span className="focus-border">
                  <i></i>
                </span> */}
              </div>

              <div className="col-3 input-effect">
                {" "}
                <label>رمز عبور</label>
                <div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {" "}
                    <input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="effect-21"
                      type="password"
                      placeholder="رمز عبور"
                      width={"500px"}
                    />
                    {params.id && (
                      <Button style={{ width: "10vw" }} onClick={handlePassword}>
                        ثبت رمز
                      </Button>
                    )}{" "}
                  </div>
                  <div style={{ width: "100%", textAlign: "right" }}>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                </div>
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
            {/* Custom Switches */}
            <Col>
              <AccessLabel>دسترسی:</AccessLabel>
              <Permissions />
            </Col>
          </div>
        </div>
      </div>{" "}
      <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Button className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
          ثبت
        </Button>
        <Link
          to="/personnel"
          className="col-3 input-effect"
          style={{ width: "10vw", fontSize: "1.5rem" }}
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
// Styled Components
const Col = styled.div`
  width: 25%;
  border: 2px solid red;
`;
const Row = styled.div`
  display: grid;
  grid-template-column: 1fr 1fr 1fr;
`;

const ParentItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
`;

const ParentCheckbox = styled.input`
  margin-right: 8px;
`;

const ParentText = styled.span`
  font-weight: bold;
`;

const ExpandIcon = styled.span`
  margin-left: auto;
`;

const ChildItemsContainer = styled.div`
  padding-left: 24px;
  margin-top: 8px;
`;

const ChildItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ChildCheckbox = styled.input`
  margin-right: 8px;
`;

const ChildText = styled.span``;

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
// Styled Components
const RadioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
`;

const RadioButton = styled.div`
  display: flex;
  align-items: center;

  input[type="radio"] {
    appearance: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    outline: none;
    cursor: pointer;
    position: relative;
    margin-right: 8px;
    vertical-align: middle;
    transition: all 0.2s ease;
    margin-left: 8px;
  }

  input[type="radio"]:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #0089a7;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  label {
    font-size: 18px;
    color: #04165d;
    cursor: pointer;
  }
`;
