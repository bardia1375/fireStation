import React, { useState, useEffect } from "react";
import "./ChangePass.css";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { ChangePasswordService } from "../../Services/authorizeService";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36c5ec;
`;

function ChangePasswoed() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [main, setMain] = useState(null);
  const [baby, setBaby] = useState({
    username: "baby",
  });
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#36c5ec");

  const handleChangePass = async(e) => {
    e.preventDefault();
    setBaby(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("OldPass", oldPass);
    formData.append("NewPass", newPass);

   await ChangePasswordService(formData).then((res) => {
      setLoading(false);
      setMain(res.data);
     
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });

    // if (main !== null) {
    // } else {
    //   setLoading(true);
    // }
  };
  return (
    <div className="pass">
      <div className="pass_header-res">
        <h3>نرم‌افزارهای من</h3>
      </div>
      <div className="pass_header">
        <h2>تغییر رمز عبور:</h2>
      </div>
      <div className="pass_total">
        <div className="pass_item">
          <h3>رمز عبور قبلی:</h3>
          <input
            placeholder="لطفا رمز قبلی خود را وارد کنید"
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>
        <div className="pass_item">
          <h3>رمز عبور جدید:</h3>
          <input
            placeholder="لطفا رمز جدید خود را وارد کنید"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        {!loading ? (
          <></>
        ) : (
          <div className="pass_main-loading">
            <div className="pass_main-loading-into">
              <h2>در حال بررسی اطلاعات</h2>
              <DotLoader
                color={color}
                loading={loading}
                css={override}
                size={30}
              />
            </div>
          </div>
        )}
        {main?.StatusCode === 0 ? (
          <h3 style={{ marginTop: "10px", color: "rgb(95, 95, 95)" }}>
            رمز عبور شما با موفقیت تغییر یافت
          </h3>
        ) : (
          <h3 style={{ marginTop: "10px", color: "rgb(95, 95, 95)" }}>
            {main?.StatusMessage}
          </h3>
        )}
      </div>

      <Link to="/" onClick={handleChangePass} className="pass_footer-link">
        تایید تغییرات
      </Link>
    </div>
  );
}

export default ChangePasswoed;
