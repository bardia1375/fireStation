import { NavLink } from "react-router-dom";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import moment from "moment-jalaali";

export default function TicketItem({ ticket }) {
  const findState = (id) => {
    switch (id) {
      case "در انتظار پاسخ":
        return {
          title: "جدید",
          class: "ticketItem__kind-new",
          colorClass: "pcolorClass",
        };
      case 2:
        return {
          title: "درحال پاسخگویی",
          class: "ticketItem__kind-isAnswering ",
          colorClass: "qcolorClass",
        };
      case 3:
        return "پاسخ مشتری";
      case 4:
        return "بسته شده";
      case "در حال پیگیری":
        return {
          title: "در حال پیگیری",
          class: "ticketItem__kind-isPending",
          colorClass: "rcolorClass",
        };
      case 7:
        return "نگه داشته شده";
      case 16:
        return "در انتظار مشتری";
      case 17:
        return "منتظر بسته شدن";
      case 18:
        return "عدم پاسخ مشتری";
      case 20:
        return "عدم پاسخ مشتری بیش از 72 ساعت";
      default:
        return "نامعوم";
    }
  };
  const findSrc = (id) => {
    switch (id) {
      case 1:
        return "/images/device.svg";

      case 3:
        return "/images/repair.svg";
      case 4:
        return "/images/device.svg";
      case 5:

      case 6:
        return "/images/karshenas.svg";

      default:
        return "/images/karshenas.svg";
    }
  };

  return (
    <li className="ticketItem">
      <NavLink
        activeClassName="activeRoute"
        to={{
          pathname: `/ticket/${ticket.TicketId}`,
          state: {
            ticket_title: ticket.Title,
            img_src: findSrc(ticket.SubjectId),
            CreatedOn: ticket.CreatedOn,
            state: ticket.TicketStatus
          },
        }}
      >
        <div className="ticketItem__imageWrapper">
          {ticket.Unread > 0 && (
            <span className="ticketItem__imageBadge">{ticket.Unread}</span>
          )}
          <img
            className="ticketItem__image"
            src={findSrc(ticket.SubjectId)}
            alt=""
          />
        </div>
        <div className="ticketItem__body">
          <div
            className={`ticketItem__kind ${findState(ticket.TicketStatus).class}`}
          >
            {findState(ticket.TicketStatus).title}
          </div>
          <div
            className={`ticketItem__title ${
              findState(ticket.TicketStatus).colorClass
            }`}
          >
            {ticket.Title}
          </div>
          <div dir="rtl" className="ticketItem__lastReply">
            پاسخگو :{ticket.Department} {"| "}
            تاریخ :
            <span dir="ltr">
              {`${convertEnglishNumberToPersian(
                 moment(ticket?.CreatedOn).format("jYYYY-jMM-jDD")   
              )}`}{" "}
              &nbsp;
              {` ${convertEnglishNumberToPersian(
                 moment(ticket?.CreatedOn).format("HH:MM")   
              )}`}{" "}
              &nbsp;
            </span>
          </div>
        </div>
      </NavLink>
    </li>
  );
}
