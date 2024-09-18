import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Personnel = ({ id, firstName, lastName, imgUrl, onEdit, dataLength, setShowModal }) => {
  return (
    <>
      {!dataLength ? (
        <div className="card">
          <img src={imgUrl} alt={`${firstName} ${lastName}`} className="card-img" />
          <h3>
            {firstName} {lastName}
          </h3>
          <Link to={`/personnel/${id}`} className="edit-btn" onClick={onEdit}>
            Editd
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="card add-card">
            <div className="add-card-content" onClick={() => setShowModal(true)}>
              <FaPlus className="plus-icon" /> {/* آیکون به‌علاوه */}
              <span className="add-text">افزودن</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Personnel;
