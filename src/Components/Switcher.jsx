import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { openModal } from "./../Actions/Modal/modal";
import { useDispatch } from "react-redux";

function Switcher({ path }) {
  const { isNewTicketModalOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleOpenModal = isOpen => {
    dispatch(openModal("newTicket", isOpen));
  };

  return <></>;
}
export default Switcher;
