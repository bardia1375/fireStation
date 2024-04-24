import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllMyTickets } from "./../Actions/Ticket/ticket";
import { useDispatch } from "react-redux";
import TicketItem from "./Ticket/TicketItem";
import { menues } from "../Utils/constVar";
import { Link, NavLink } from "react-router-dom";
import { userLogOut } from "../Actions/User/user";
export default function SideBar() {
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);
  const [height, setHeight] = useState(true);

  const { searchTerm, isActive, isSearching } = useSelector(
    (state) => state.tickets
  );
  const handleGetMyTicketsList = async () => {
    const { allTickets } = await dispatch(getAllMyTickets(1,100));
    setTickets(allTickets);
  };
  // filterTicketsBysearch
  useEffect(async () => {
    handleGetMyTicketsList();
  }, [searchTerm, isSearching]);

  useEffect(() => {
    handleGetMyTicketsList();
    const refreshData = setInterval(async () => {
      handleGetMyTicketsList();
    }, 120000);
    return () => {
      clearInterval(refreshData);
    };
  }, [isActive]);

  const onScroll = (e) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      setHeight(false);
    } else {
      setHeight(true);
    }
  };

  const style = {
    height: "100%",
    maskImage: height
      ? "linear-gradient(to bottom, black calc(100% - 120px), transparent 100%)"
      : null,
    WebkitMaskImage: height
      ? "linear-gradient(to bottom, black calc(100% - 120px), transparent 100%)"
      : null,
  };
  const handleChange = (title) => {
    if (title === "خروج") {
      dispatch(userLogOut());
    }
  };
  return (
    <>
      <ul className="SidebarList" style={style} onScroll={onScroll}>
        {menues.map((item) => {
          return (
            <NavLink
              activeClassName="activeRouteSideBar"
              to={item.url}
              className="SidebarListItem"
              onClick={() => handleChange(item.title)}
            >
              <div>
                <img src={item.imgUrl} alt="" />
              </div>
              <p>{item.title}</p>
            </NavLink>
          );
        })}
      </ul>
    </>
  );
}
