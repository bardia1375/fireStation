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
function Navbar() {
  const { searchTerm, isActive } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const location = useLocation();

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
                <>
               
                </>
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
