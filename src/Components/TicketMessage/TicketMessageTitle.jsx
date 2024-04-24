import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";
import { useState } from "react";
import moment from "moment-jalaali";
export default function TicketMessageTitle({ state, id, RefrenceCode }) {
  const [showDetails, setShowDetails] = useState(false);
  const date = moment(state?.CreatedOn).format("jYYYY-jMM-jDD");
  console.log("Asdasdas", state);
  return (
    <>
      <div className="ticket__header">
        <div className="ticket__title">
          <img src={state?.img_src} alt="" />
          <p>{state?.ticket_title}</p>
          <div
            className="verticalDevider"
            style={{
              width: "3px",
              height: "40px",
              borderRadius: "2rem",
              marginRight: "1rem",
            }}
          />
          <div className="ticket__createdDate">
            تاریخ ثبت :{" "}
            <span dir="ltr">
              {" "}
              {convertEnglishNumberToPersian(moment(date).format("YYYY-MM-DD "))}
            </span>
          </div>
        </div>
        <div className="ticket__number">
          <div>شماره تیکت :</div>
          <div>{convertEnglishNumberToPersian(RefrenceCode)}</div>
        </div>
      </div>
      <div className="ticket__header-mobile">
        <div className="ticket__title-mobile" onClick={() => setShowDetails(!showDetails)}>
          <img src={state?.img_src} alt="" />
          <p>{state?.ticket_title}</p>
        </div>
        {showDetails && (
          <>
            <div className="ticket__title-date">
              تاریخ ثبت : <span dir="ltr"> {convertEnglishNumberToPersian(state?.CreatedOn)}</span>
            </div>
            <div className="ticket__title-id">
              شماره تیکت :<span> {convertEnglishNumberToPersian(id)}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
