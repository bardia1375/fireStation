import { useSelector } from "react-redux";
import { convertEnglishNumberToPersian } from "./../../Utils/commonFunctions";

export default function UserImage(params) {
  const { NewMessages } = useSelector((state) => state.auth);

  return (
    <div className="tickment__navbar__userPicture">
      <div className="tickment__navbar__notifyBadge">
        {convertEnglishNumberToPersian(NewMessages)}
      </div>
      <div className="tickment__navbar__img">
        <img src="/images/profileTest.png" alt="" />
      </div>
    </div>
  );
}
