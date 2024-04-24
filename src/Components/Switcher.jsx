import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { openModal } from "./../Actions/Modal/modal";
import { useDispatch } from "react-redux";

function Switcher({ path }) {
  const { isNewTicketModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleOpenModal = (isOpen) => {
    dispatch(openModal("newTicket", isOpen));
  };

  return (
    <>
      <div className="switcher">
        {!path?.startsWith("/ticket") ? (
          <>
            <span
              className={`newticket ${
                isNewTicketModalOpen ? "" : "newticket-close"
              }`}
              onClick={() => handleOpenModal(true)}
            >
              <div className="plus"></div>
              <span
                style={{
                  opacity: isNewTicketModalOpen ? 1 : 0,
                }}
              >
                تیکت جدید
              </span>
            </span>
            <Link
              to={"/ticket"}
              className={`allticket ${
                !isNewTicketModalOpen ? "" : "allticket-close"
              }`}
              onClick={() => handleOpenModal(false)}
            >
              <img src="/images/allticket.svg" alt="" />
              <span style={{ opacity: !isNewTicketModalOpen ? 1 : 0 }}>
                تیکت‌های من
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link className={`switcher__back-arrow `} to="/">
              <img src="/images/back-arrow.svg" alt="" />
            </Link>
            <div className={`switcher__search`}>
              <img
                className="switcher__search-icon"
                src="/images/search-icon.svg"
                alt=""
              />
              <input
                type="text"
                className="switcher__searchInput"
                placeholder="جست و جو کن ..."
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Switcher;
