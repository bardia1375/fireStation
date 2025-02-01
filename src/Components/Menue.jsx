import { menues } from "../Utils/constVar";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenueItem from "./Menue/MenueItem";
import { Link } from "react-router-dom";

export default function Menue() {
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

  return (
    <div className="menue__Container">
      <div className="menue">
        <ul className="menue__body">
          {/* {menues.map((item, idx) => {
            return <MenueItem item={item} key={`${item.title} ${idx}`} />;
          })} */}
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
