import "./style.css";
const Stations = ({
  firstName,
  lastName,
  imgUrl,
  onEdit,
  missionNumber,
  clockMission,
  name,
  connect,
}) => {
  return (
    <div className="card">
      <img src={imgUrl} alt={`${firstName} ${lastName}`} className="card-img" onClick={() => {}} />

      <h3>فرشته</h3>
      <p>ثانیه شمار</p>
      <div style={{ position: "absolute", bottom: 0, right: 16 }}>{missionNumber}</div>
      <div style={{ position: "absolute", bottom: 0, left: 16 }}>{clockMission}</div>
    </div>
  );
};

export default Stations;
