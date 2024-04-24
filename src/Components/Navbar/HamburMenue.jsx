import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openMenue } from "../../Actions/Modal/modal";

export default function HamburMenue() {
  const { isMobileMenueOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleOpenMenue = (e) => {
    dispatch(openMenue(!isMobileMenueOpen));
  };

  return (
    <div className="tickment__navbar__hamburgerMenu" id="menuToggle">
      <input
        type="checkbox"
        checked={isMobileMenueOpen}
        onChange={handleOpenMenue}
      />
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
