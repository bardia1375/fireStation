import { menues } from "../Utils/constVar";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { showActiveTickets } from "../Actions/Ticket/ticket";
import { useDispatch, useSelector } from "react-redux";
import SwitchStatus from "./Commons/SwitchStatus";
import MenueItem from "./Menue/MenueItem";
import { Link } from "react-router-dom";

export default function Menue() {
  const { isActive } = useSelector((state) => state.tickets);

  useEffect(() => {
    const app = document.getElementById("app");

    app.style.overflowY = "hidden";
    app.style.height = "1252px";

    return () => {
      app.style.overflowY = "auto";
      app.style.height = "auto";
    };
  }, []);
  const dispatch = useDispatch();

  const handleShowActiveTickets = (e) => {
    dispatch(showActiveTickets(!isActive));
  };
  const handleOnchangeSearch = (e) => {
    // dispatch(searchInTickets(e.target.value));
  };
  const handleShowSearchResults = (e) => {
    // dispatch(setIsSearching(e.type));
  };

  return (
    <div className="menue__Container">
      <div className="menue">
        <Link
          to={"/"}
          className="menue__header"
          onClick={handleShowActiveTickets}
        >
          <SwitchStatus />
        </Link>
        <ul className="menue__body">
          {menues.map((item, idx) => {
            return <MenueItem item={item} key={`${item.title} ${idx}`} />;
          })}
        </ul>
      </div>
      <Footer
        style={{
          position: "absolute",
          bottom: "0",
          right: "50%",
          transform: "translate(50%, 0px)",
        }}
      />
    </div>
  );
}
