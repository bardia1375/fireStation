import React from "react";
import "./Home.css";
import mainImage from "./assets/385.jpg";
import mainImageRes from "./assets/384.jpg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Home({ name, lastName,handleExit }) {
  const profileConfig = localStorage.getItem("Responsible");

  
  return (
    <div className="home">
      <div className="home_img">
        <img src={mainImage} className="home_image" />
        <img src={mainImageRes} className="home_image-res" />
      </div>

      <h3 className="home_text">
        {profileConfig} عزیز؛ سلام. ({profileConfig} نیستید؟{" "}
        <a onClick={handleExit} style={{ color: "red" }} >
          خارج شوید
        </a>
        )
      </h3>

      <h3 className="home_text-paragraph">
        اگر تاکنون اطلاعات سازمان، دستگاه‌ها، نرم افزار و قراردادهای خود را در
        سایت درج نکرده‌اید، به بخش‌های «اطلاعات کاربر و سازمان»، «قرارداد های
        من»، «دستگاه‌های من» و «نرم افزارهای من» مراجعه کنید و با مشاهدۀ فیلم
        آموزشی مربوطه اطلاعات آن بخش را کامل کنید.
      </h3>
    </div>
  );
}

export default Home;
