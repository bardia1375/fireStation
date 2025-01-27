import { Link, useHistory, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useIsEndpointCrud, useIsEndpointPermitted } from "Utils/permissionUtils";

const Personnel = ({
  id,
  firstName,
  lastName,
  imgUrl,
  onEdit,
  dataLength,
  setShowModal,
  isActive,
}) => {
  const endpoint = "/UserManagjement/CreateUser";
  const hasPermission = useIsEndpointCrud(endpoint);

  return (
    <>
      {!dataLength ? (
        <div className={isActive ? `personnelCard` : "personnelCardDis"}>
          {/* <img src={imgUrl} className="card-img" /> */}
          <IoPersonSharp className="personnel-img" color="gray" />

          <h3>
            {firstName} {lastName}
          </h3>
          {hasPermission && (
            <Link to={`/personnel/${id}`} className="PersonnelEdit-btn" onClick={onEdit}>
              <FaEdit size={16} />
            </Link>
          )}
        </div>
      ) : (
        hasPermission && (
          <div className="card">
            <div className="card add-card" onClick={() => setShowModal(true)}>
              <div className="add-card-content">
                <FaPlus className="plus-icon" color="#ffa700" /> {/* آیکون به‌علاوه */}
                {/* <BsFillPersonPlusFill /> */}
                <span className="add-text">افزودن</span>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Personnel;
