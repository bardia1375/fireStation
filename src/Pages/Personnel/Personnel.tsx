import "./style.css"
const Personnel = ({ firstName, lastName, imgUrl, onEdit }) => {
    return (
      <div className="card">
        <img src={imgUrl} alt={`${firstName} ${lastName}`} className="card-img" />
        <h3>{firstName} {lastName}</h3>
        <button className="edit-btn" onClick={onEdit}>Edit</button>
      </div>
    );
  };

  export default Personnel