import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { errorMessage } from "../Utils/commonFunctions";

const ChangePassword = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.loading);

  const [passwordInfo, setpasswordInfo] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const { userName, password, confirmPassword } = passwordInfo;
  const handlepassword = async () => {
    if (password !== confirmPassword) {
      errorMessage("رمز عبور با تکرار رمز عبور یکسان نیست");
      return false;
    }

    const user = new FormData();

    user.append("userName", passwordInfo.userName);
    user.append("password", passwordInfo.password);

    // await dispatch(userpassword(user));
    navigate.push("/");
  };
  const handleChange = (e) => {
    setpasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="white_bakground"></div>

      <div className="signUp">
        <img src="/images/logo-dark.svg" />
        <p className="signUp__title">باشگاه هواداری  تیکمنت</p>
        <form action="" className="signUp__from">
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            className="signUp__input"
            placeholder="نام کاربری"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="رمز عبور جدید"
            className="signUp__input"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="signUp__input"
            placeholder="تکرار رمز عبور  "
          />
        </form>
        <span
          className="login__btn"
          // onClick={() => !isloading && handleSignUp()}
        >
          {" "}
          {isloading && <div className="loader-btn"> </div>}
          ورود به پنل
        </span>
      </div>
    </>
  );
};

export default ChangePassword;
