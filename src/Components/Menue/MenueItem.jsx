import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMenue } from "../../Actions/Modal/modal";
import { userLogOut } from "../../Actions/User/user";
export default function MenueItem({ item }) {
  const dispatch = useDispatch();

  const handleOpenMenue = (e) => {
    if (item.title == "خروج") {
      dispatch(userLogOut());
    } else {
      dispatch(openMenue(false));
    }
  };
  return (
    <li className="menue__item">
      <NavLink
        to={item.url}
        activeClassName="menue__item-selected"
        style={{ color: item.title == "خروج" ? "#FF8080" : "" }}
        onClick={() => handleOpenMenue(item.title)}
      >
        <img src={item.imgUrl} alt="" />
        {item.title}
      </NavLink>
    </li>
  );
}
