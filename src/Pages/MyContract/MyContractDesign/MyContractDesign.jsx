import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import './style/GlobalStyle.css';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import CircleIcon from '@mui/icons-material/Circle';
import "./MyContractDesign.css";
import axios from "axios";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
// import NoteIcon from '@mui/icons-material/Note';
import DesignSelectorcopy from "./DesignSelectorcopy";

import { ContractsModal } from "./ContractsModal";
import { ContactModal } from "./ContactModal";
import { MyPlansSoftServices } from "../../../Services/contractService";
import { IoIosAddCircle, IoIosArrowBack } from "react-icons/io";
import DesignSelector from "./DesignSelector";
import { numberWithCommasAndPersian } from "../../../Components/Commons/NumberToPersian";
import { setAuthToken } from "../../../Services/httpService";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function MyContractDesign({ token, softwareId, func }) {
  const [contractDesign, setContractDesign] = useState([]);
  const [activeObject, setActiveObject] = useState(false);
  const [controlPlan, setControlPlan] = useState(null);
  const [controlIdPlan, setControlIdPlan] = useState(null);
  const [cont, setCont] = useState(null);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contactModal, setContactModal] = useState(false);
  let [color, setColor] = useState("#0b647c");
  const history = useHistory();

  const handleSoftwareList = e => {
    // e.preventDefault();
    setActiveObject(!activeObject);
  };

  const controlContract = data => {
    setControlPlan(data);
  };

  const controlContractId = data => {
    // data.preventDefault();
    console.log("dat234a", data);
    setControlIdPlan(data);
  };

  useEffect(() => {
    MyPlansSoftServices(softwareId)
      .then(res => {
        setContractDesign(res.data.Data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(true);
      });
  }, []);
  func(controlIdPlan);

  const handleCarouselSlider = () => {};

  const [prices, setPrices] = useState(null);
  useEffect(() => {
    setPrices(
      contractDesign?.Plans?.map(item => {
        return { price: item.Price, contract: item.PlanName };
      })
    );
  }, [contractDesign]);

  const [refGet, setRefGet] = useState(null);

  const formatter = new Intl.NumberFormat("fa-IR", {
    // style: 'currency',
    // currency: 'IRI',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  // const [boxShadow, setBoxShadow] = useState(false);
  // useEffect(() => {
  //   if (boxShadow) {
  //     html2canvas(refGet.current).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4', true);
  //       var width = pdf.internal.pageSize.getWidth();
  //       var height = pdf.internal.pageSize.getHeight();

  //       // const Yekan = BYekan;

  //       // pdf.addFileToVFS('BYekan.ttf', Yekan);
  //       // pdf.addFont('BYekan.ttf', 'BYekan', 'normal');
  //       pdf.setFont('Vazir');
  //       pdf.setFontSize(20);

  //       pdf.addImage(imgData, 'PNG', 0, 0, 210, 100, 'FAST');
  //       prices.map((item, index) => {
  //         pdf.text(`:طرح ${item.contract}`, 205, 120 + 10 * index, {
  //           align: 'right',
  //         });
  //       });
  //       prices.map((item, index) => {
  //         pdf.text(`مبلغ: ${formatter.format(item.price)} ریال`, 120, 120 + 10 * index, {
  //           align: 'right',
  //         });
  //       });

  //       pdf.save('download.pdf');
  //     });
  //     setBoxShadow(false);
  //   }
  // }, [boxShadow]);

  const [headers, setHeaders] = useState(["خدمات", "شرح خدمات"]);
  const [body, setBody] = useState([]);
  const [nextMove, setNextMove] = useState(false);
  const [bodyCheck, setBodyCheck] = useState([]);
  const [headersCheck, setHeadersCheck] = useState([]);
  useEffect(() => {
    setAuthToken();
  }, []);
  useEffect(() => {
    if (!!contractDesign) {
      contractDesign?.Plans?.map(item => {
        if (headers?.filter(title => title === item.PlanName).length === 0) {
          setHeaders(prev => [...prev, item.PlanName]);
        }
      });
    }
  }, [contractDesign]);
  useEffect(() => {
    if (!!contractDesign) {
      contractDesign?.Items?.map(item => {
        if (body?.filter(title => title[0] === item.Title).length === 0) {
          setBody(prev => [...prev, [item.Title, item?.Description ? item?.Description : ""]]);
        }
      });
      setNextMove(true);
    }
  }, [contractDesign]);
  useEffect(() => {
    if (nextMove) {
      contractDesign?.Plans?.map(plan => {
        JSON.parse(plan?.Items).map((item, index) => {
          body[index].push(
            item[index + 1] === true
              ? "دارد"
              : item[index + 1] === false
              ? "ندارد"
              : `${item[index + 1]}بار`
          );
        });
      });
      setNextMove(false);
    }
  }, [nextMove]);

  useEffect(() => {
    if (body.length > 2 && bodyCheck.length === 0) {
      setBodyCheck(
        body.map(item => {
          return item.reverse();
        })
      );
    }
  }, [body]);
  useEffect(() => {
    if (headers.length > 2 && headersCheck.length === 0) {
      setHeadersCheck(headers.reverse());
    }
  }, [headers]);

  const [contractsModal, setContractsModal] = useState(false);
  const downloadHandler = ref => {
    setContractsModal(true);
  };
  const [height, setHeight] = useState(true);

  const onScroll = e => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      setHeight(false);
    } else {
      setHeight(true);
    }
  };
  console.log("contractDcontractDesignesign", contractDesign);
  return (
    <div
      onScroll={onScroll}
      className="myContractDesign"
      // style={{
      //   height: "100%",
      //   maskImage: height
      //     ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
      //     : null,
      //   WebkitMaskImage: height
      //     ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
      //     : null,
      // }}
    >
      {contractsModal && (
        <ContractsModal
          items={contractDesign.map(el => el.ContractPackageItems)}
          onClose={setContractsModal}
          boxShadow={false}
          contracts={contractDesign}
        />
      )}
      {contactModal && <ContactModal onClose={setContactModal} />}
      <div className="myContractDesign_header-res">
        {/* <NoteIcon /> */}+<h3>قرارداد جدید</h3>
      </div>

      {!loading ? (
        <div>
          <div className="myContractDesign-header">
            <h2>لطفا طرح مورد نظر خود را انتخاب کنید.</h2>
          </div>
          <div style={{ position: "absolute", right: "40px", top: "80px", zIndex: 1000 }}>
            <Link onClick={downloadHandler} className="mycontractDesign_link-route">
              <h3>جزئیات قراردادها</h3>
            </Link>
          </div>
          <div
            className="myContractDesign-header2"
            style={{ position: "absolute", left: "40px", top: "70px" }}
          >
            {controlPlan ? (
              <div
                style={{
                  display: "flex",

                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  zIndex: 10000,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h3 style={{ color: "#37B3B8" }}>مجموع قیمت: </h3>
                  <h3 style={{ color: "#E67205" }}>
                    {numberWithCommasAndPersian(contractDesign[0]?.ContractPackagePrice)} ریال
                  </h3>
                </div>
                {price === 0 ? (
                  <Link
                    // to={`/mycontract/software/design/:softID/order`}
                    onClick={() => {
                      setContactModal(true);
                    }}
                    className="mycontractsoft_link-route"
                  >
                    <h3>مرحله بعد</h3>
                    {/* <ArrowBackIosIcon /> */}
                    <IoIosArrowBack />
                  </Link>
                ) : (
                  <Link
                    to={`/mycontract/software/design/:softID/order`}
                    className="mycontractsoft_link-route"
                  >
                    <h3>مرحله بعد</h3>
                    <IoIosArrowBack />
                  </Link>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h3 style={{ color: "#37B3B8" }}>مجموع قیمت: </h3>
                  <h3 style={{ color: "#E67205" }}>
                    {numberWithCommasAndPersian(contractDesign[0]?.ContractPackagePrice)} ریال
                  </h3>
                </div>
                <Link
                  to="/mycontract/software/design/:softID/"
                  className="mycontractsoft_link-route-dis"
                >
                  <h3>مرحله بعد</h3>
                  <IoIosArrowBack />
                </Link>
              </div>
            )}
          </div>

          <div className="myContractDesign-body">
            <div style={{ marginRight: "40px" }} className="myContractDesign-body-side">
              <div className="myContractDesign-body-title">
                <div className="myContractDesign-body-title-into in-run-active anime_constructure">
                  <h4>انتخاب نرم‌افزار</h4>
                  <IoIosAddCircle color="gray" size="20px" />
                  {/* <CheckCircleIcon className='anime_icon_check' /> */}

                  {/* <CircleIcon className='anime_icon_active' /> */}
                  <hr className="myContractDesign-body-title-line"></hr>
                  {/* <hr className="myContractDesign-body-title-line anime_line_active"></hr> */}
                </div>
                {/* <hr className="myContractSoft-body-title-line"></hr> */}
                <div className="myContractDesign-body-title-into-active anime_constructure">
                  <hr className="myContractDesign-body-title-line-two"></hr>
                  <h4>انتخاب طرح</h4>
                  {/* <CircleIcon /> */}
                  <IoIosAddCircle size="20px" />
                </div>
                {/* <hr className="myContractSoft-body-title-line-two"></hr> */}
                <div className="myContractDesign-body-title-into">
                  <h4>تایید سفارش</h4>
                  <IoIosAddCircle size="20px" />

                  {/* <CircleIcon /> */}
                </div>
              </div>
            </div>
            <div className="myContractDesign-body-main">
              <div className="myContractDesign-header-title-res">
                <h2>لطفا طرح مورد نظر خود را انتخاب کنید.</h2>
              </div>

              {/* {contractDesign.map((des) => ( */}
              <DesignSelectorcopy
                boxShadow={false}
                contracts={contractDesign}
                setContractDesign={setContractDesign}
                itemsContract={contractDesign.map(el => el.ContractPackageItems)}
                func={controlContract}
                setRefGet={setRefGet}
                funcId={controlContractId}
                setPrice={setPrice}
                //   check={des.Id === controlIdPlan}
                onPress={setCont}
              />
              {/* ))} */}

              {/* <Carousel
                slides={contractDesign.map((des) => (
                  // <Link to={`/mycontract/software/design/:softID/order`}>
                  <div className="myContractDesign_carousel_plan">
                    <PlansList
                      id={des.Id}
                      items={des.Items}
                      planName={des.PlanName}
                      price={des.Price}
                      func={controlContract}
                      funcId={controlContractId}
                      check={des.Id === controlIdPlan}
                      onPress={() => setCont(des.Id)}
                      managePlan={controlPlan}
                    />
                  </div>
                  // </Link>
                ))}
                interval={false}
              /> */}
            </div>
          </div>
          <div className="myContractDesign-footer">
            {controlPlan ? (
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  whiteSpace: "noWrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h3 style={{ color: "#37B3B8" }}>مجموع قیمت: </h3>
                  <h3 style={{ color: "#E67205" }}>
                    {numberWithCommasAndPersian(contractDesign[0]?.ContractPackagePrice)} ریال
                  </h3>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h3 style={{ color: "#37B3B8" }}>مجموع قیمت: </h3>
                  <h3 style={{ color: "#E67205" }}>
                    {numberWithCommasAndPersian(contractDesign[0]?.ContractPackagePrice)} ریال
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="GlobalStyle-sidePage-plan_loading"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="GlobalStyle-sidePage-plan-loading-into"
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

export default MyContractDesign;
