import React, { useState, useEffect } from "react";
import "./MyContractSoft.css";
// import './style/GlobalStyle.css';
import { Link } from "react-router-dom";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import CircleIcon from '@mui/icons-material/Circle';
import axios from "axios";
// import NoteIcon from '@mui/icons-material/Note';
import SoftwareList from "../SoftwareList";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
// import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSoftwareSerialService } from "../../../Services/contractService";
import { IoIosAddCircle, IoIosArrowBack } from "react-icons/io";
import { setAuthToken } from "../../../Services/httpService";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function MyContractSoft({ token, functionContractSoftId, getContractPackageId }) {
  const [activeObject, setActiveObject] = useState(false);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0b647c");

  const listSoft = [
    {
      id: 1,
      name: "دستگاه حضور غیاب",
      serial: 2244,
    },
    {
      id: 2,
      name: "دستگاه حضور",
      serial: 254,
    },
    {
      id: 3,
      name: "دستگاه غیاب",
      serial: 25801,
    },
    {
      id: 4,
      name: "دستگاه",
      serial: 22447245,
    },
  ];
  const [category, setCategory] = useState();
  const [contractSoft, setContractSoft] = useState([]);
  const [control, setControl] = useState(null);
  const [controlId, setControlId] = useState(null);
  const [cont, setCont] = useState(null);
  useEffect(() => {
    setAuthToken();
  }, []);
  const handleChange = e => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    getAllSoftwareSerialService()
      .then(res => {
        setContractSoft(res?.data?.Data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const controlContract = data => {
    console.log("datadata123321", data);
    setControl(data);
  };

  const controlContractId = data => {
    console.log("CustomerSoftwareId", data);
    setControlId(data);
    getContractPackageId(data);
  };
  const getSoftwareId = data => {
    functionContractSoftId(data);
  };

  ///////////////////////////////////////////////////////////////
  const [activeTotal, setActiveTotal] = useState(null);

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow_right" onClick={onClick}>
        {/* <FaAngleRight /> */}
      </div>
    );
  };

  const PrewArrow = ({ onClick }) => {
    return (
      <div className="arrow_left" onClick={onClick}>
        {/* <FaAngleLeft /> */}
      </div>
    );
  };

  //   const settings = {
  //     infinite: true,
  //     lazyLoad: true,
  //     speed: 300,
  //     slidesToShow: 3,
  //     centerMode: true,
  //     centerPadding: 0,
  //     nextArrow: <NextArrow />,
  //     prewArrow: <PrewArrow />,
  //   };
  // const array1String = JSON.stringify(array1);
  // const array2String = JSON.stringify(array2);

  return (
    <div className="myContractSoft">
      <div className="myContractSoft_header-res">
        {/* <NoteIcon /> */}
        <h3>قرارداد جدید</h3>
      </div>

      {!loading ? (
        <div>
          <div className="myContractSoft-header">
            <h2>لطفا نرم‌افزار مورد نظر خود را انتخاب کنید.</h2>
          </div>
          <div className="myContractSoft-footer">
            {control ? (
              <Link
                to={`/mycontract/software/design/:SoftwareId`}
                className="mycontractsoft_link-route"
                style={{ marginTop: "-16px", marginBottom: "16px" }}
              >
                <h3>مرحله بعد</h3>
                <IoIosArrowBack />
              </Link>
            ) : (
              <Link
                to="/mycontract/software"
                className="mycontractsoft_link-route-dis"
                style={{ marginTop: "-16px", marginBottom: "16px" }}
              >
                <h3>مرحله بعد</h3>
                <IoIosArrowBack />
              </Link>
            )}
          </div>
          <div className="myContractSoft-body">
            <div className="myContractSoft-body-side">
              <div className="myContractSoft-body-title">
                <div className="myContractSoft-body-title-into-active">
                  <h4>انتخاب نرم‌افزار</h4>
                  <IoIosAddCircle size="20px" />

                  <hr className="myContractSoft-body-title-line"></hr>
                </div>

                <div className="myContractSoft-body-title-into another-item">
                  <hr className="myContractSoft-body-title-line-two"></hr>
                  <h4>انتخاب طرح</h4>
                  <IoIosAddCircle color="gray" size="20px" />
                </div>

                <div className="myContractSoft-body-title-into last-item-res">
                  <h4>تایید سفارش</h4>
                  <IoIosAddCircle color="gray" size="20px" />
                </div>
              </div>
            </div>
            <div className="myContractSoft-body-main">
              <div className="myContractSoft-header-title-res">
                <h2>لطفا نرم‌افزار مورد نظر خود را انتخاب کنید.</h2>
              </div>
              <div className="myContractSofts">
                {contractSoft?.map(soft => (
                  <div className="myContractSoft_no_carousel_plan">
                    <SoftwareList
                      id={soft.CustomerSoftwareId}
                      name={soft.SoftwareName}
                      serial={`سریال: ${soft.SoftwareSerial}`}
                      url={soft.Url}
                      func={controlContract}
                      softwareId={soft.SoftwareId}
                      funcId={controlContractId}
                      getSoftwareId={getSoftwareId}
                      check={soft.CustomerSoftwareId === controlId}
                      onPress={() => setCont(soft.CustomerSoftwareId)}
                      //    activated={() => prioritySoftware}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="GlobalStyle-sidePage_loading"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="GlobalStyle-sidePage-loading-into"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>صفحه در حال بارگذاری است</h1>
            <MoonLoader color={color} loading={loading} css={override} size={60} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyContractSoft;
