import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import { errorMessage } from "../Utils/commonFunctions";
import { openModal } from "./../Actions/Modal/modal";
import {
  createNewTicket,
  getAllMyTickets,
  getAllSubjects,
  getAllSoftwareSerial,
} from "./../Actions/Ticket/ticket";

export default function NewTicket() {
  const { isNewTicketModalOpen } = useSelector(state => state.modal);

  const [newTicket, setNewTicket] = useState({
    SoftwareSerial: { Title: "انتخاب کنید", Id: "" },
    ticketSubject: { Title: "انتخاب کنید", Id: "" },
    ticketName: { Title: "", Id: "" },
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const [software, setSoftware] = useState([]);
  const [subjests, setSubjects] = useState([
    { Id: "100000000", Title: "رفع ایراد سامانه" },
    { Id: "100000001", Title: "ارتباط با دستگاه" },
    { Id: "100000002", Title: "نصب مجدد" },
    { Id: "100000003", Title: "اعلان خرابی دستگاه" },
    { Id: "100000004", Title: "آموزش مجدد" },
    { Id: "100000005", Title: "اعزام کارشناس" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDropDownOpenSoftware, setIsDropDownOpenSoftware] = useState(false);
  const { ticketName, ticketSubject, SoftwareSerial } = newTicket;

  const findSrc = id => {
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
  const handleCreateNewTicket = async () => {
    if (!ticketSubject.Id || !ticketSubject.Id > 0) {
      errorMessage("لطفا سریال نرم افزار را انتخاب کنید");
    }
    if (!SoftwareSerial.Id || !SoftwareSerial.Id > 0) {
      errorMessage("لطفا دسته مربوطه را انتخاب کنید");
    }
    // if (!ticketName.Title) {
    //   errorMessage("لطفا متن پیام خود وارد نمایید.");
    // }
    if (
      (ticketSubject.Id || ticketSubject.Id > 0) &&
      (SoftwareSerial.Id || SoftwareSerial.Id > 0)
      // ticketName.Title
    ) {
      setLoading(true);
      const newTicket = new FormData();
      newTicket.append("TitleValue", ticketSubject.Id);
      newTicket.append("CustomerSoftwareId", SoftwareSerial.Id);
      newTicket.append("Description", ticketName.Title);
      const date = {
        TitleValue: ticketSubject.Id,
        CustomerSoftwareId: SoftwareSerial.Id,
        Description: ticketName.Title,
      };
      const result = await dispatch(createNewTicket(date));
      if (result.status) {
        await dispatch(getAllMyTickets());
        let ticket_title, img_src, regDate;
        result.all.allTickets.map(item => {
          if (item.Id == result.id) {
            ticket_title = item.Subject;
            img_src = findSrc(item.SubjectId);
            regDate = item.RegDate;
          }
        });
        console.log("result", result?.Data?.TicketId);
        history.push(`/ticket/${result?.data?.Data?.TicketId}`, {
          ticket_title,
          img_src,
          regDate,
        });
        handleOpenModal(false);
      }
      setLoading(false);
    }
  };

  const handleOnChangeNewTicket = (name, value) => {
    setNewTicket(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetAllSubjects = async e => {
    // const { allSubjects } = await getAllSubjects();
    const { SoftwareSerialItems } = await getAllSoftwareSerial();
    // setSubjects(allSubjects);
    setSoftware(SoftwareSerialItems);
  };
  const handleOpenModal = isDropDownOpen => {
    dispatch(openModal("newTicket", isDropDownOpen));
  };
  useEffect(() => {
    handleGetAllSubjects();
    // const { SoftwareSerial } =  getAllSoftwareSerial();
    // console.log("SoftwareSerial",SoftwareSerial);
  }, []);
  useEffect(() => {
    const body = document.body;
    if (window.outerWidth < 769 && isNewTicketModalOpen) {
      body.style.overflowY = "hidden";
    }
    return () => {
      if (window.outerWidth < 769 && isNewTicketModalOpen) {
        body.style.overflowY = "auto";
      } else {
        body.style.overflowY = "hidden";
      }
    };
  }, [isNewTicketModalOpen]);
  const ref = useRef();
  useEffect(() => {
    const closeDropDown = e => {
      if (ref.current && !ref.current.contains(e.target) && handleOpenModal !== undefined) {
        handleOpenModal(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [isDropDownOpen, isDropDownOpenSoftware]);
  return (
    <div className="newTicket__container">
      <div className="newTicket" ref={ref}>
        <span onClick={() => handleOpenModal(false)} className="newTicket__close">
          <img src="/images/close.svg" alt="cross" />
        </span>
        <p className="newTicket__header">ساخت تیکت جدید</p>
        <div className="newTicket__body">
          <div className="newTicket__inputContainer">
            <label>سریال نرم افزار</label>
            {/* <input
              type="text"
              placeholder="نام تیکت خود را بنویسید"
              value={ticketName}
              onChange={(e) =>
                handleOnChangeNewTicket("ticketName", e.target.value)
              }
            /> */}
            <div
              style={{ zIndex: "1" }}
              className={`newTicket__categoryContainer  toggle-btn ${
                isDropDownOpenSoftware
                  ? "newTicket__categoryContainer-open active"
                  : "newTicket__categoryContainer-close"
              }`}
              onClick={() => setIsDropDownOpenSoftware(!isDropDownOpenSoftware)}
            >
              {/* <span className="arrow"></span> */}
              <span className="newTicket__categoryItem-selected">{SoftwareSerial.Title}</span>
              <div
                className={`newTicket__Categories ${
                  isDropDownOpenSoftware
                    ? "newTicket__Categories-open"
                    : "newTicket__Categories-close"
                }`}
              >
                {software.map((subject, index) => {
                  return (
                    <span
                      key={`subject ${subject?.CustomerSoftwareId}`}
                      className={"newTicket__categoryItem"}
                      onClick={() =>
                        handleOnChangeNewTicket("SoftwareSerial", {
                          Title: subject?.SoftwareName,
                          Id: subject?.CustomerSoftwareId,
                        })
                      }
                    >
                      {subject?.SoftwareSerial}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hr"></div>
          <div
            className="newTicket__inputContainer"
            style={{
              marginTop: "1rem",
            }}
          >
            <label>به کدام دسته مرتبط است؟</label>
            <div
              className={`newTicket__categoryContainer  toggle-btn ${
                isDropDownOpen
                  ? "newTicket__categoryContainer-open active"
                  : "newTicket__categoryContainer-close"
              }`}
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              {/* <span className="arrow"></span> */}
              <span className="newTicket__categoryItem-selected">{ticketSubject.Title}</span>
              <div
                className={`newTicket__Categories ${
                  isDropDownOpen ? "newTicket__Categories-open" : "newTicket__Categories-close"
                }`}
              >
                {subjests.map(subject => {
                  return (
                    <span
                      key={`subject ${subject.Id}`}
                      className={"newTicket__categoryItem"}
                      onClick={() => handleOnChangeNewTicket("ticketSubject", subject)}
                    >
                      {subject.Title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="newTicket__inputContainer"> */}
          {/* <label>توضیحات</label> */}
          {/* <input
              type="text"
              placeholder="نام تیکت خود را بنویسید"
              value={ticketName}
              onChange={(e) =>
                handleOnChangeNewTicket("ticketName", e.target.value)
              }
            /> */}
          <div style={{ padding: "0 24px" }}>
            <textarea
              // disabled={Disabled}
              type="text"
              value={newTicket.ticketName.Title}
              onChange={e => handleOnChangeNewTicket("ticketName", { Title: e.target.value })}
              // onChange={(e) => {
              //   !e.target.value.endsWith("\n") &&
              //     handleChangeNewMesssage(e.target.value);
              // }}
              // onKeyDown={(e) => {
              //   !e.shiftKey && e.key == "Enter" && handleCreateMessage();
              //   e.shiftKey &&
              //     e.key == "Enter" &&
              //     handleChangeNewMesssage("\n");
              // }}
              className="ticket__newMessageInput2"
              placeholder="چیزی بنویسید ..."
              cols="30"
              rows="10"
            ></textarea>
          </div>
          {/* </div> */}
          <div className="newTicket__actions">
            <span className="btn newTicket__btn-cancel" onClick={() => handleOpenModal(false)}>
              لغو
            </span>
            <span
              className="btn newTicket__btn"
              onClick={() => !loading && handleCreateNewTicket()}
            >
              {loading && <div className="loader-btn"> </div>}
              ایجاد تیکت
            </span>
          </div>
        </div>
      </div>
      <Footer
        style={{
          position: "absolute",
          bottom: "0",
          right: "50%",
          transform: "translate(50%, 0)",
        }}
      />
    </div>
  );
}
