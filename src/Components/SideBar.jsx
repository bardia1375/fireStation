import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { menues } from "../Utils/constVar";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userLogOut } from "../Actions/User/user";
import { isAdmin, useIsEndpointCrud, useIsEndpointNavbar } from "Utils/permissionUtils";
import { usePermissions } from "../Context/PermissionContext";

export default function SideBar() {
  const dispatch = useDispatch();

  const [height, setHeight] = useState(true);
  const { userPermissions } = usePermissions();
  const role = localStorage.getItem("Admin");
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(userPermissions?.data);
  }, [userPermissions?.data.length > 0]);
  const onScroll = e => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
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
  const handleChange = title => {
    if (title === "خروج") {
      dispatch(userLogOut());
      window.location.href = "/auth/login"; // هدایت به صفحه لاگین
    }
  };
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
  console.log("item?.role", newData);

  return (
    <>
      <ul className="SidebarList" style={style} onScroll={onScroll}>
        {menues.map(item => {
          console.log("item?.role", newData?.includes(item?.role));

          if (isAdmin() || newData?.includes(item?.role) || item?.role === "/dashboard"||item?.role === "/stations") {
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
          }
        })}
      </ul>
    </>
  );
}
