import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Actions/User/user";
import { errorMessage } from "../../Utils/commonFunctions";
import "./login.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const { userLoginLoading } = useSelector(state => state.auth);
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ userName: "", password: "" });

  const handleLoginInfo = e => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setUserLoginInfo({
      UserName: loginInfo.userName,
      Password: loginInfo.password,
    });
  }, [loginInfo.userName, loginInfo.password]);

  const validateForm = () => {
    const newErrors = { userName: "", password: "" };
  
    // Validate userName: should not contain Persian characters
    if (/[\u0600-\u06FF]/.test(loginInfo.userName)) {
      newErrors.userName = "نام کاربری نباید شامل کاراکترهای فارسی باشد.";
    }
  
    // Validate password: should be at least 6 characters and English
    if (!/^[a-zA-Z0-9!@#$%^&*()_+={}[\]|\\:;"'<>,.?/]+$/.test(loginInfo.password) || loginInfo.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل 6 کاراکتر و شامل حروف انگلیسی باشد.";
    }
  
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };
  

  const handleuserLogin = async () => {
    if (!validateForm()) {
      return; // Do not proceed if validation fails
    }

    await dispatch(userLogin(userLoginInfo));
  };

  const fetchTodoList = () => {
    // Example fetch function, replace with your actual API call
    // axios.get("qwewq");
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="login">
      <div className="login__logo">
        <p className="login__title">سامانه پایش زمان</p>
      </div>
      <div className="login__wrapper">
        <p className="login__title">پنل مدیریت</p>

        <form className="login__form">
          <div className="login__inputWrapper">
            <img className="login__inputIcon" src="/images/avatar.svg" alt="" />
            <input
              className="login__input"
              name="userName"
              type="text"
              placeholder="شماره همراه خود را وارد کنید"
              onChange={handleLoginInfo}
              value={loginInfo.userName}
            />
            {errors.userName && <span className="error-message">{errors.userName}</span>}
          </div>
          <div className="login__inputWrapper">
            <img
              className="login__inputIcon"
              src="/images/showpassword.svg"
              style={{ width: "20px", height: "17px", right: "10px" }}
              onClick={handleShowPassword}
              alt=""
            />
            <input
              className="login__input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              onChange={handleLoginInfo}
              value={loginInfo.password}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </form>
        <div className="login__action">
          <span className="login__btn" onClick={() => !userLoginLoading && handleuserLogin()}>
            {userLoginLoading && <div className="loader-btn"></div>}
            ورود
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
