import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getprofile, userLogOut } from "./../Actions/User/user";
import HamburMenue from "./Navbar/HamburMenue";
import NavBarContainer from "./Navbar/NavBarContainer";
import UserImage from "./Navbar/UserImage";
import UserInfo from "./Navbar/UserInfo";
import UserContainer from "./Navbar/UserContainer";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // برای اضافه کردن استایل‌های پیش‌فرض
import serverApi from "../Services/httpService";
export const getSettingData = async () => {
  const { data } = await serverApi.get(`/profile`);
  return data.data;
};
function Navbar() {
  const dispatch = useDispatch();
  const renderRole = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "Admin":
        return "مدیر";
      case "NormalUser":
        return "کاربر سامانه";
        break;
      case "Watcher":
        return "مشاهده گر";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getprofile());
  }, []);

  const handleLogout = () => {
    dispatch(userLogOut());
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="tickment__navbar-main" style={{ position: "absolute", top: "32px" }}>
      <div className="tickment__navbar-mobile">
        <NavBarContainer>
          <HamburMenue />
          <UserInfo />
          <UserImage />
        </NavBarContainer>
      </div>
      <div className="tickment__navbar-desktop-contaner">
        <UserContainer
          style={{
            position: "absolute",
            right: "25px",
            top: "-25px",
            zIndex: "22",
          }}
        >
          <UserImage />
          <UserInfo />
        </UserContainer>

        <div className="tickment__navbar-desktop">
          <NavBarContainer>
            <UserContainer
              style={{
                display: "none",
              }}
            >
              <UserImage />

              <UserInfo />
            </UserContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            ></div>
            <div className="tickment__navbar__left">
              <div className="tickment__navbar__logout-referesh">
                <Link onClick={handleRefresh}>
                  <img src="/images/refresh-logo.svg" alt="" />
                </Link>
                <div>
                  {" "}
                  <Tooltip
                    anchorId="person-icon"
                    content={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>{renderRole()}</div>
                      </div>
                    }
                    place="bottom"
                  />
                  <BsPersonCircle size={33} id="person-icon" />
                </div>
                <Link>
                  <img src="/images/logout-logo.svg" alt="" onClick={() => handleLogout()} />
                </Link>
              </div>
            </div>
          </NavBarContainer>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
