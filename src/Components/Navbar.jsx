import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchInTickets, setIsSearching, showActiveTickets } from "../Actions/Ticket/ticket";
import { getprofile, userLogOut } from "./../Actions/User/user";
import HamburMenue from "./Navbar/HamburMenue";
import NavBarContainer from "./Navbar/NavBarContainer";
import UserImage from "./Navbar/UserImage";
import UserInfo from "./Navbar/UserInfo";
import UserContainer from "./Navbar/UserContainer";
import VerticalDevider from "./Commons/VerticalDevider";
import SwitchStatus from "./Commons/SwitchStatus";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // برای اضافه کردن استایل‌های پیش‌فرض
import serverApi from "../Services/httpService";
import { useQuery } from "@tanstack/react-query";
export const getSettingData = async () => {
  const { data } = await serverApi.get(`/profile`);
  return data.data;
};
function Navbar() {
  const { searchTerm, isActive } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const location = useLocation();
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
  const handleShowActiveTickets = e => {
    dispatch(showActiveTickets(!isActive));
  };
  const handleOnchangeSearch = e => {
    dispatch(searchInTickets(e.target.value));
  };
  const handleShowSearchResults = e => {
    dispatch(setIsSearching(e.type));
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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getSettingData,
  });

  console.log("datasdf", data);
  const bardia = data?.split(" ");
  console.log("bard234234ia", bardia);

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
            >
              {location?.pathname.includes("/ticket") ? (
                <>
                  <Link to={"/"} className="tickment__navbar__mytickets">
                    <img src="/images/mytickets-icon.svg" alt="" />
                    خانه
                  </Link>
                  <VerticalDevider />
                  <div className="tickment__navbar__actions">
                    {/*
                    <span>خانه</span>
                     */}
                    <div className={`tickment__navbar__search`}>
                      <input
                        type="text"
                        placeholder="جست و جو کن ..."
                        value={searchTerm}
                        //onKeyDown={handleOnKeyDown}
                        onChange={handleOnchangeSearch}
                        // render search component when focus
                        onFocus={handleShowSearchResults}
                        // render ticketslist component when blur
                        //onBlur={handleShowSearchResults}
                      />
                      <img src="/images/search-icon.svg" alt="" />
                    </div>
                    <div
                      className="tickment__navbar__switch"
                      onClick={handleShowActiveTickets}
                      style={{
                        fontFamily: isActive ? "main" : "hairline",
                      }}
                    >
                      <SwitchStatus />
                    </div>
                  </div>
                  <VerticalDevider />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="tickment__navbar__left">
              <div className="tickment__navbar__logout-referesh">
                {/* <Link to="./profile">
                  <img src="/images/settingg-logo.svg" alt="" />
                </Link> */}
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
                        <span>
                          {bardia?.map((el, index) => (
                            <span style={{margin:"0 2px"}}>{bardia[index]}</span>
                          ))}
                        </span>
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
              {/* <div className="tickment__navbar__logo" style={{ transform: "translateY(4px)" }}>
                <img src="/images/Jahangostar Logo2-01-10-15 .png" alt="" />
              </div> */}
            </div>
          </NavBarContainer>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
