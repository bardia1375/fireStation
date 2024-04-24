// import { Checkbox } from '@mui/material';
import React, { useState } from "react";
import "./MyContractSoft/MyContractSoft.css";
// import './style/GlobalStyle.css';
import softimage from "./MyContractSoft/iosite.jpg";
import { Link } from "react-router-dom";

function SoftwareList({ name, id, serial, url, func, funcId, check,softwareId,getSoftwareId }) {
  const [activeObject, setActiveObject] = useState(false);
  const [activeTotal, setActiveTotal] = useState(null);

  const handleSoftwareList = (e) => {
    // e.preventDefault();
    funcId(e);
    func(true);
    getSoftwareId(softwareId)
  };

  return (
    <div
      className="myContractSoft-body-item"
      id={`${id}`}
      onClick={() => {
        handleSoftwareList(id);
      }}
    >
      {/* <a href={`#${id}`}> */}
      <div
        className={`myContractSoft-body-item-into ${
          check ? "activeObject" : "deActiveObject"
        }`}
        to="/mycontract/software/design/:SoftwareId"
      >
        <img src={softimage}  />
        <p style={{ fontSize: "1vw" }}>{name}</p>
        <h4 className="font-digit" style={{ fontSize: "0.9vw" }}>
          {serial}
        </h4>
        <input type="checkbox" id="contract_check" className="contract-input" />
      </div>
      {/* </a> */}
    </div>
  );
}

export default SoftwareList;
