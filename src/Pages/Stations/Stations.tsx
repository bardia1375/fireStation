import { FaPlus } from "react-icons/fa";
import "./style.css";
import { Link } from "react-router-dom";
import imgUrl from "../../assets/VideoIcon/redLed.png";
const Stations = ({
  firstName,
  lastName,
  onEdit,
  missionNumber,
  clockMission,
  name,
  connect,
  setShowModal,
  dataLength,
  id,
}) => {
  return (
    <>
      <Link to={`/stations/${id}`} className="card" onClick={onEdit}>
        <div className="station-header">
          <h3>فرشته</h3> {/* نام ایستگاه */}
        </div>
        <div>
          <img src={imgUrl} width="50px" height="50px" alt={`${firstName} ${lastName}`} />{" "}
          {/* اضافه کردن GIF */}
        </div>
        <p style={{ margin: "4px 0 16px 0", fontSize: "1.2em" }} className="digital-clock">
          12 : 23
        </p>
        <div style={{ position: "absolute", bottom: 0, right: 16, fontFamily: "Vazir Digit" }}>
          {missionNumber}10
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 16, fontFamily: "Vazir Digit" }}>
          {clockMission}03 : 10
        </div>
      </Link>
    </>
  );
};

export default Stations;
