import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../Actions/Modal/modal";
import { getprofile } from "../Actions/User/user";

export default function NewTicketButton() {
  const { isNewTicketModalOpen } = useSelector((state) => state.modal);
  const { CanSendTicket } = useSelector((state) => state.auth);
  console.log("TokenInfo",CanSendTicket);
  const dispatch = useDispatch();
  const [Ticket, setTicket] = useState([]);
  const handleOpenModal = () => {
    dispatch(openModal("newTicket", true));
  };

//  if(true){
//   const { CanSendTicket } = useSelector((state) => state.auth.profileInformation);
//   setIsCanSendTicket(CanSendTicket)
//  }

//   useEffect(() => {
//     setTicket(isCanSendTicket);
//   }, [isCanSendTicket]);
  console.log("isCanSendTicket",CanSendTicket);
  return (
    <Link
      to={true ? "/ticket" : "/mycontract/software"}
      className={`newticket newticket-desktop ${
        isNewTicketModalOpen
          ? "newticket-desktop-open"
          : "newticket-desktop-close"
      }`}
      onClick={true ? handleOpenModal : ""}
    >
      <div className="plus"></div>
      <div
        style={{
          opacity: isNewTicketModalOpen ? 1 : 1,
          fontSize: "1.5vw",
          marginRight: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {true ? "تیکت جدید" : "تمدید قرارداد"}
      </div>
    </Link>
  );
}
