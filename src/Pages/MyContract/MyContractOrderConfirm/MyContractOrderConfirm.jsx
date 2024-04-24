import React, { useState, useEffect } from "react";
import "./MyContractOrderConfirm.css";
// import './style/GlobalStyle.css';
import { Link } from "react-router-dom";
import axios from "axios";
// import NoteIcon from '@mui/icons-material/Note';
// import CircleIcon from '@mui/icons-material/Circle';
import swal from "sweetalert2";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
// import './style/GlobalStyle.css';
import { useHistory } from "react-router-dom";
import { MyOrderPlansSoftServices, MyPlansSoftServices } from "../../../Services/contractService";

import { IoIosAddCircle, IoIosArrowBack } from "react-icons/io";
import moment from "moment-jalaali";
import { numberWithCommasAndPersian } from "../../../Components/Commons/NumberToPersian";
import { setAuthToken } from "../../../Services/httpService";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function MyContractOrderConfirm({ token, contractConfirmId, softwareId, ContractPackageId }) {
  console.log("contractConfirmId", contractConfirmId);
  const [control, setControl] = useState(null);
  const [contractOrder, setContractOrder] = useState([]);
  const [check, setCheck] = useState(false);
  const [contractConfirm, setContractConfirm] = useState({
    Id: "000",
  });
  const [contractDesignConfirm, setContractDesignConfirm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  let [color, setColor] = useState("#0b647c");
  const [discountCodeInput, setDiscountCodeInput] = useState(true);
  useEffect(() => {
    setAuthToken();
  }, []);
  const history = useHistory();
  console.log("contractDesignConfirm", contractConfirmId);

  const handleContract = e => {
    setClicked(true);
    e.preventDefault();
    setContractConfirm(null);
    //setLoading(true);
    console.log("softwareIdsoftwareIdsoftwareId", ContractPackageId);
    const data = {
      ContractPackageId: [contractConfirmId],
      CustomerSoftwareId: ContractPackageId,
    };
    MyOrderPlansSoftServices(data)
      .then(res => {
        swal.fire({
          position: "center",
          icon: "success",
          title: ".سفارش شما با موفقیت ثبت شد",
          showConfirmButton: true,
        });
        setContractConfirm(res.data);
        history.push("/myorder");
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
        // setLoading(false);
      });
  };

  useEffect(() => {
    MyPlansSoftServices(softwareId)
      .then(res => {
        setContractDesignConfirm(res.data.Data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(true);
      });
  }, []);
  const [height, setHeight] = useState(true);

  const handleCheck = () => {
    setCheck(!check);
  };
  const onScroll = e => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      setHeight(false);
    } else {
      setHeight(true);
    }
  };
  const Time = new Date();
  const changeِdisCount = () => {
    setDiscountCodeInput(false);
  };

  return (
    <div
      onScroll={onScroll}
      className="myContractOrder"
      style={{
        height: "100%",
        maskImage: height
          ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
          : null,
        WebkitMaskImage: height
          ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
          : null,
      }}
    >
      <div className="myContractOrder_header-res">
        {/* <NoteIcon /> */}
        NoteIcon
        <h3>قرارداد جدید</h3>
      </div>

      {!loading ? (
        <div>
          <div className="myContractOrder-header">
            <h2>لطفا شرایط قرارداد را بخوانید و سفارش را تایید کنید.</h2>
          </div>

          <div className="myContractOrder-body">
            <div className="myContractOrder-body-side">
              <div className="myContractOrder-body-title">
                <div className="myContractOrder-body-title-into in-run-active first-title-active">
                  <h4>انتخاب نرم‌افزار</h4>
                  <IoIosAddCircle color="gray" size="20px" />

                  {/* <CheckCircleIcon className='anime_icon_check-confirm-first' /> */}

                  <hr className="myContractOrder-body-title-line"></hr>
                </div>
                {/* <hr className="myContractSoft-body-title-line"></hr> */}
                <div className="myContractOrder-body-title-into last-item-res in-run-active">
                  <hr className="myContractOrder-body-title-line-two"></hr>
                  <h4>انتخاب طرح</h4>
                  {/* <CheckCircleIcon className='anime_icon_check-confirm' /> */}
                  <IoIosAddCircle color="gray" size="20px" />

                  {/* <CircleIcon className='anime_icon_active-confirm' /> */}
                </div>
                {/* <hr className="myContractSoft-body-title-line-two"></hr> */}
                <div className="myContractOrder-body-title-into-active last-item-res">
                  <h4>تایید سفارش</h4>
                  <IoIosAddCircle size="20px" />

                  {/* <CircleIcon /> */}
                </div>
              </div>
            </div>
            <div className="myContractOrder-body-main">
              <div className="myContractOrder_total">
                <table className="myContractOrder_table">
                  <thead>
                    {/* <div className="myapp_table-head"> */}
                    <tr className="myContractOrder_table-header">
                      <th>شماره سفارش</th>
                      <th>تاریخ سفارش</th>
                      <th>مجموع</th>
                    </tr>
                    {/* </div> */}
                  </thead>
                  <div className="myContractOrder_total_body-table">
                    {contractDesignConfirm
                      ?.filter(design => design.ContractPackageId === contractConfirmId)
                      .map(sign => (
                        <div className="myContractOrder_table-body-list">
                          <tbody className="myContractOrder_table-tbody">
                            <tr className="myContractOrder_table-body-into">
                              <td className="font-digit">324560</td>
                              <td style={{ marginRight: "85px" }} className="font-digit">
                                {Time.toLocaleDateString("fa-IR")}
                              </td>
                              <td className="font-digit">
                                1 محصول/ {sign?.Price?.toLocaleString()}ریال
                              </td>
                            </tr>
                            <div className="myContractOrder_body-item">
                              <tr className="myContractOrder_body-item-into-first">
                                <td style={{ fontFamily: "Vazir" }}>{sign.ContractPackageTitle}</td>
                                <div className="vltwo"></div>
                                <td className="font-digit" style={{ fontFamily: "Vazir" }}>
                                  {/* {sign?.Price?.toLocaleString()} ریال */}
                                  {numberWithCommasAndPersian(sign?.ContractPackagePrice)} ریال
                                </td>
                                <div className="vltwo"></div>
                                <td style={{ fontFamily: "Vazir" }}>تخفیف</td>
                                <div className="vltwo"></div>
                                <td className="font-digit" style={{ fontFamily: "Vazir" }}>
                                  {numberWithCommasAndPersian(sign?.ContractPackageDiscount)} ریال
                                </td>
                              </tr>
                            </div>
                            <div className="myContractOrder_body-item">
                              <tr className="myContractOrder_body-item-into-two">
                                <td style={{ fontFamily: "Vazir" }}>مجموع</td>
                                <div className="vltwo"></div>
                                <td className="font-digit" style={{ fontFamily: "Vazir" }}>
                                  {numberWithCommasAndPersian(sign?.ContractPackagePrice)} ریال
                                </td>
                                <div className="vltwo"></div>
                                <td style={{ fontFamily: "Vazir" }}>مالیات</td>
                                <div className="vltwo"></div>
                                <td className="font-digit" style={{ fontFamily: "Vazir" }}>
                                  {numberWithCommasAndPersian(sign.ContractPackageTax)} ریال
                                </td>
                              </tr>
                            </div>
                            <div className="myContractOrder_body-item">
                              <tr className="myContractOrder_body-item-into-price">
                                <td className="font-digit" style={{ fontFamily: "Vazir" }}>
                                  قیمت نهایی:{" "}
                                  {/* {(sign.Price + sign.Vat - sign.Discount)?.toLocaleString()} ریال */}
                                  {numberWithCommasAndPersian(sign?.ContractPackagePrice)} ریال
                                </td>
                              </tr>
                            </div>
                          </tbody>
                        </div>
                      ))}
                  </div>
                </table>
                <div className="myContractOrder_table-res">
                  {contractDesignConfirm
                    ?.filter(design => design.ContractPackageId === contractConfirmId)
                    .map(sign => (
                      <div className="myContractOrder_table-res-total">
                        <div className="myContractOrder_table-res-rows">
                          <h4>شماره سفارش</h4>
                          <h4 className="font-digit"></h4>
                        </div>
                        <div className="myContractOrder_table-res-rows">
                          <h4>تاریخ سفارش</h4>
                          <h4 className="font-digit">{moment().format("jYYYY-jMM-jDD")}</h4>
                        </div>
                        <div className="myContractOrder_table-res-rows last-line-row">
                          <h4>مجموع</h4>
                          <h4 className="font-digit">
                            {numberWithCommasAndPersian(sign?.ContractPackagePrice)} ریال
                          </h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="contract_text">
              <h4>شرایط قرارداد:</h4>
              <strong>
                نصب و راه اندازی مجدد یا آموزش مجدد برای مشتریان دارای نرم افزار تحت وب، رایگان
                نبوده و مستلزم پرداخت هزینه مجزا طبق تعرفه هر ساله می‌باشد.
              </strong>
              <p>
                نصب و راه‌اندازی مجدد یا آموزش مجدد در نرم‌افزار IO Control صرفا یکبار به صورت
                رایگان صورت می‌پذیرد و بیش از آن مستلزم پرداخت هزینه مجزا طبق تعرفه هرساله می‌باشد.
              </p>
              <p>
                کسر هر گونه مبلغ از پیش فاکتور تحت عنوان مالیات، بیمه و سایر کسورات مورد تایید
                نمی‌باشد.
              </p>
              <p style={{ fontWeight: 600 }}>
                لازم به ذکر است در صورت پرداخت بصورت آفلاین، فعال شدن قرارداد جدید مستلزم بارگذاری
                فیش واریزی در بخش سفارش‌های من می‌باشد.
              </p>
              <p>
                نسخه نرم افزاری که مشتری با پرداخت هزینه و یا بصورت رایگان تهیه کرده، بدون محدودیت
                زمانی کار خواهد کرد.
              </p>
              <p>
                در صورت بروز خطاهای حاد سیستم: شامل از کار افتادن نرم افزار(توقف کامل) مشکلات امنیتی
                (هک و دیفنس) بروز خطایی که درصد زیادی از کل قابلیت های نرم افزار بلااستفاده شود ثبت
                و پردازش نادرست داده های عملیاتی که باعث اختلال اساسی گردد مشتری موظف به فراهم آوردن
                دسترسی ریموت به سرور سامانه می باشد تا شرکت طی مدت 2 روز کاری اقدام به رفع آنها
                نماید.
              </p>
              <p>
                در صورت بروز مشکلات غیر حاد: خطاهایی که منجر به اختلال کامل نرم افزار نشده است مشتری
                موظف به فراهم آوردن دسترسی ریموت به سرور سامانه می باشد تا شرکت طی مدت 20 روز کاری
                اقدام به رفع آنها نماید.
              </p>
            </div>
          </div>
          <div className="myContractOrder-footer">
            <div
              style={{
                display: "flex",
                gap: "32px",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div className="myContractOrder-footer-contract">
                <input type="checkbox" id="contract-check" checked={check} onClick={handleCheck} />
                <h3 onClick={handleCheck} style={{ fontFamily: "Vazir" }}>
                  شرایط قرارداد را میپذیرم
                </h3>
              </div>
              {/* {discountCodeInput ? (
                <button
                  className="mycontractsoft_link-route-button"
                  onClick={changeِdisCount}
                >
                  افزودن کد تخفیف
                </button>
              ) : (
                <div className="myContractOrder-footer-CodeContract">
                  <button className="mycontractsoft_link-route-button">
                    اعمال
                  </button>
                  <input type="text" />
                  <h3 onClick={handleCheck} style={{ fontFamily: "Vazir" }}>
                    کدتخفیف
                  </h3>
                </div>
              )} */}
            </div>
            <div className="myContractOrder-footer-end">
              {contractDesignConfirm
                ?.filter(design => design.ContractPackageId === contractConfirmId)
                .map(sign => (
                  <h2 className="myContractOrder-footer-price-res">
                    مجموع سفارش ها:
                    <span className="font-digit" style={{ fontFamily: "Vazir" }}>
                      {numberWithCommasAndPersian(sign?.ContractPackagePrice)}
                      ریال
                    </span>
                  </h2>
                ))}
              {check ? (
                clicked ? (
                  <div style={{ whiteSpace: "nowrap" }} className="mycontractOrder_link-route-div">
                    <h3>در حال بارگذاری. . .</h3>
                  </div>
                ) : (
                  <Link
                    style={{ whiteSpace: "nowrap" }}
                    onClick={handleContract}
                    to={`/mycontract/software/design/:SoftwareId`}
                    className="mycontractsoft_link-route"
                  >
                    <h3>تایید سفارش</h3>
                  </Link>
                )
              ) : (
                <Link
                  to="/mycontract/software/design/:SoftwareId/order"
                  className="mycontractsoft_link-route-dis"
                >
                  <h3>تایید سفارش</h3>
                </Link>
              )}
              {contractDesignConfirm
                ?.filter(design => design.ContractPackageId === contractConfirmId)
                .map(sign => (
                  <h2 className="myContractOrder-footer-price" style={{ fontFamily: "Vazir" }}>
                    مجموع سفارش ها:
                    <span className="font-digit" style={{ fontFamily: "Vazir" }}>
                      {numberWithCommasAndPersian(sign?.ContractPackagePrice)} ریال
                    </span>
                  </h2>
                ))}
            </div>
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

export default MyContractOrderConfirm;
