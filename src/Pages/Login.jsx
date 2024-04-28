import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "./../Actions/User/user";
import { useSelector } from "react-redux";
import { errorMessage } from "../Utils/commonFunctions";
import { useParams } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { userLoginLoading } = useSelector(state => state.auth);
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });
  
  // const token = useParams();

  // const token = useParams();
  // console.log(token);
  // if (token != undefined) {
  //   localStorage.setItem("tickment_token", token);
  //   dispatch({
  //     type: "VERIFY_USER_SUCCESS",
  //     payload: null,
  //   });
  // }

  const [showPassword, setShowPassword] = useState(false);
  const handleLoginInfo = e => {
    setLoginInfo(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
  const handleuserLogin = async () => {
    // const user = new FormData();
    // if (
    //   loginInfo.password.trim().length == 0 ||
    //   loginInfo.userName.trim().length == 0
    // ) {
    //   errorMessage("نام کاربری یا پسورد وارد نشده است");
    //   return false;
    // }
    // user.append("UserName", loginInfo.userName);
    // user.append("Password", loginInfo.password);
    // // user.append("UserName", "09181600635");
    // // user.append("Password", "1");
    await dispatch(userLogin(userLoginInfo));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <p className="login__title  "> جهان‌گستر </p>
      </div>
      <div className="login__wrapper">
        <p className="login__title  ">پنل مدیریت </p>

        <form className="login__form">
          <div className="login__inputWrapper">
            <img className="login__inputIcon" src="/images/avatar.svg" alt="" />
            <input
              className="login__input"
              name="userName"
              type="text"
              maxLength={11}
              placeholder="شماره همراه خود را وارد کنید"
              onChange={handleLoginInfo}
            />
          </div>
          <div className="login__inputWrapper">
            <img
              className="login__inputIcon"
              src="/images/showpassword.svg"
              style={{
                width: "20px",
                height: "17px",
                right: "10px",
              }}
              onClick={handleShowPassword}
            />
            <input
              className="login__input"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              onChange={handleLoginInfo}
            />
          </div>
        </form>
        <div className="login__action">
          <span className="login__btn" onClick={() => !userLoginLoading && handleuserLogin()}>
            {" "}
            {userLoginLoading && <div className="loader-btn"> </div>}
            ورود
          </span>
          <Link to="/auth/getCode" className="login__forgotPassword">
            {" "}
            رمز عبور خود را به یاد نمی آورید؟{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
