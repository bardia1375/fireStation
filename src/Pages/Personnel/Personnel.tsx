import { Link, useParams } from "react-router-dom";
import "./style.css";
const Personnel = ({ id,firstName, lastName, imgUrl, onEdit }) => {
  return (
    <div className="card">
      <img src={imgUrl} alt={`${firstName} ${lastName}`} className="card-img" />
      <h3>
        {firstName} {lastName}
      </h3>
      <Link to={`/personnel/${id}`} className="edit-btn" onClick={onEdit}>
        Editd
      </Link>
    </div>
  );
};

export default Personnel;
