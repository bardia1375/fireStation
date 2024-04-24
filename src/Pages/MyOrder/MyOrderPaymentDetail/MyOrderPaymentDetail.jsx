import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyOrderPaymentDetail.css";
// import './style/GlobalStyle.css';
import { Link } from "react-router-dom";
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Select from "react-dropdown-select";
// import NumberFormat from 'react-number-format';
//import { DatePicker } from 'react-persian-datepicker';
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import { ReactComponent as MyOrderIcon } from "../../../assets/orders/myorder.svg";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllDataService, getOneDataService } from "../../../Services/DevicesServices";
import { DatePicker } from "jalali-react-datepicker";
import { Field } from "../../../Components/Commons/Field";
import { Dropdown } from "../../../Components/Commons";
import { PatternFormat } from "react-number-format";
import { AiFillAccountBook, AiFillCiCircle, AiFillDollarCircle } from "react-icons/ai";
import SecondaryArrow from "../../../assets/General/secondary-down.svg";
import serverApi from "../../../Services/httpService";
import {
  errorMessage,
  handleErrorResponse,
  successMessage,
} from "./../../../Utils/commonFunctions";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";
import { numberWithCommasAndPersian } from "../../../Components/Commons/NumberToPersian";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function MyOrderPaymentDetail({ orderArrayBody, token }) {
  console.log("orderArrayBody", orderArrayBody);
  const [orderList, setOrderList] = useState([]);
  const [comboId, setComboId] = useState();
  const [transaction, setTransatoion] = useState();
  const [cardId, setCardId] = useState();
  const [bank, setBank] = useState();
  const [number, setNumber] = useState();
  const [date, setDate] = useState();
  const [des, setDes] = useState("");
  const [RefId, setRefId] = useState("");
  const [AccountOwner, setAccountOwner] = useState("");
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  let [color, setColor] = useState("#0b647c");
  const [image, setImage] = useState();
  const [fish, setFish] = useState();
  const history = useHistory();
  const [price, setPrice] = useState();
  const [QuoteId, setQuoteId] = useState();
  const [ImageName, setImageName] = useState([]);
  const [ImageSize, setImageSize] = useState();
  console.log("ImageName", ImageName);
  console.log("ImageSize", ImageSize);
  console.log("orderListorderList", orderList);
  useEffect(() => {
    setPrice(orderList.map(order => order.QuoteTotal).reduce((a, b) => a + b, 0));
  }, [orderList]);
  useEffect(() => setQuoteId(orderList.map(el => el.QuoteId)), [orderList]);
  const { TableItem } = useSelector(state => state.tableData);
  console.log("TableItemTableItemTableItem", TableItem);

  const option = [
    {
      id: 0,
      Title: "کارت به کارت",
    },
    {
      id: 1,
      Title: "واریز به حساب",
    },
    {
      id: 2,
      Title: "پایا - ساتا",
    },
  ];

  const card = [
    {
      id: 1,
      Title: "6219-8670-0009-1427سامان",
    },
    {
      id: 2,
      Title: "5041-7211-1316-1971رسالت",
    },
  ];
  const account = [
    {
      id: 1,
      Title: "832-40-3892892-1سامان",
    },
    {
      id: 2,
      Title: "10-9205570-1رسالت",
    },
  ];
  const sheba = [
    {
      id: 1,
      Title: "سامانIR560560083204003892892001",
    },
    {
      id: 2,
      Title: "رسالتIR740700001000229205570001",
    },
  ];

  const banks = [
    { id: 1, Title: "بانک ملی ایران" },
    { id: 2, Title: "بانک سپه" },
    { id: 3, Title: "بانک توسعه صادرات ایران" },
    { id: 4, Title: "بانک صنعت و معدن" },
    { id: 5, Title: "بانک کشاورزی" },
    { id: 6, Title: "بانک مسکن" },
    { id: 7, Title: "پست بانک ایران" },
    { id: 8, Title: "بانک توسعه تعاون" },
    { id: 9, Title: "بانک اقتصاد نوین" },
    { id: 10, Title: "بانک پارسیان" },
    { id: 11, Title: "بانک پاسارگاد" },
    { id: 12, Title: "بانک کارآفرین" },
    { id: 13, Title: "بانک سامان" },
    { id: 14, Title: "بانک سینا" },
    { id: 15, Title: "بانک سرمایه" },
    { id: 16, Title: "بانک شهر" },
    { id: 17, Title: "بانک دی" },
    { id: 18, Title: "بانک صادرات" },
    { id: 19, Title: "بانک ملت" },
    { id: 20, Title: "بانک تجارت" },
    { id: 21, Title: "بانک رفاه" },
    { id: 22, Title: "بانک حکمت ایرانیان" },
    { id: 23, Title: "بانک گردشگری" },
    { id: 24, Title: "بانک ایران زمین" },
    { id: 25, Title: "بانک قوامین" },
    { id: 26, Title: "بانک انصار" },
    { id: 27, Title: "بانک خاور میانه" },
    { id: 28, Title: "بانک مشترک ایران-ونزوئلا" },
    { id: 29, Title: "بانک آینده" },
    { id: 30, Title: "بانک قرض‌الحسنه مهر ایران" },
    { id: 31, Title: "بانک قرض‌الحسنه رسالت" },
    { id: 250, Title: "سایر" },
  ];

  /*

موسسه اعتباری توسعه
موسسه اعتباری کوثر مرکزی
موسسه اعتباری ملل
موسسه اعتباری نور
موسسه اعتباری کاسپین
*/

  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/v2/Orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setOrderList(res.data.Data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(true);
      });
  };
  console.log("orderListorderList", orderList);
  // useEffect(() => {
  //   getAllDataService("QuoteGetAll")
  //     .then(res => {
  //       setOrderList(res.data.Data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(true);
  //     });
  // }, [fish]);

  useEffect(() => {
    getOneDataService("QuoteGet", selectedItems)
      .then(res => {
        setOrderList(res.data.Data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [fish]);

  const { selectedItems } = useSelector(state => state.tableData);

  function bytesToMegabytes(bytes) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2); // Keep two decimal places
  }
  const handleImage = e => {
    const fileSizeInMegabytes = bytesToMegabytes(e.target.files[0].size);
    setImageSize(fileSizeInMegabytes);
    setImageName(e.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      const file = {
        FileContent: base64,
        MimeType: e.target.files[0].type,
        FileName: "فیش واریزی",
      };
      setImage(file);
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleType = e => {
    //setComboId(e)
    comboId?.map(com => com.id) == 0
      ? setCardId(card[0].Title)
      : comboId?.map(com => com.id) == 1
      ? setCardId(account[0].Title)
      : setCardId(sheba[0].Title);
  };
  console.log("ImageName", ImageName);

  const payAmout = orderList
    .filter(od => od.Id === orderArrayBody)
    .map(order => order.Sum)
    .reduce((a, b) => a + b, 0);
  const getBank = data => {
    setBank(data.id);
  };
  const handleFish = e => {
    setClicked(true);
    console.log("comboId", comboId);
    console.log("bankId", bank);
    console.log("cardId", cardId);

    const data = {
      PayType: comboId,
      DepositedTo: cardId,
      Bank: bank,
      CartNumber: number,
      TrackingNumber: RefId,
      Price: price,
      DepositDate: date ? date : moment().format("YYYY-MM-DD"),
      DepositorsName: AccountOwner,
      Description: des,
      QuoteId: QuoteId,
      // QuoteId: orderArrayBody,
      FileContent: image.FileContent,
      MimeType: image.MimeType,
      FileName: image.FileName,
    };
    console.log("qweqweq", image);
    // const formData = new FormData();
    // formData.append("Type", comboId === "واریز به حساب" ? 1 : comboId === "کارت به کارت" ? 0 : 2);
    // //   orderArrayBody.forEach(item => {
    // //       formData.append('OrderId', item.id);
    // //   });
    // //   formData.append('OrderId', JSON.stringify(orderArrayBody));
    // formData.append("OrderId", orderArrayBody);
    // formData.append("Pan", number);
    // formData.append("PayDate", date ? date : moment().format("jYYYY-jM-jD"));
    // formData.append("Amount", payAmout);
    // formData.append("Bank", "1");
    // formData.append("RefId", RefId);
    // formData.append("AccountOwner", AccountOwner);
    // formData.append("Description", des);
    // formData.append("Account", "1");
    // formData.append("files", image);
    setLoading(true);

    serverApi
      .post(`OrderPaymentCreate`, data)
      .then(res => {
        setLoading(false);
        setFish(res.data);
        // if (res.data.StatusCode == 0) {
        //   Swal({
        //     text: "فیش شما با موفقیت ثبت شد",
        //     icon: "success",
        //     timer: 2500,
        //   });
        //   history.push("/myorder")

        // }else if(res.data.StatusCode == -500){
        //   Swal({
        //     text: "لطفا تمام فیلدها را کامل کنید",
        //     icon: "error",
        //     timer: 2500,
        //   });
        // } else {
        //   Swal({
        //     text: "عملیات ثبت فیش با مشکل روبه رو شده است",
        //     icon: "error",
        //     timer: 2500,
        //   });
        // }
        setClicked(false);
        console.log("res.data", res.data, AccountOwner);
        if (res.data.ActionCode == 0) {
          //   Swal({
          //     text: "فیش شما با موفقیت ثبت شد",
          //     icon: "success",
          //     timer: 2500,
          //   });
          //   history.push("/myorder")
          successMessage("عملیات با موفقیت انجام شد");
          history.push("/myorder");
        } else {
          errorMessage("لطفا تمام فیلدها را کامل نمایید");
        }
      })
      .catch(err => {
        // setClicked(false);
        // setLoading(true)
        errorMessage("عملیات ناموفق بود لطفا مجدد تلاش کنید");
      });
  };
  const getByText = el => {
    console.log("idddd", el);
    setTransatoion(el.Title);
    setComboId(el.id);
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
  function submitExample({ value }) {
    setDate(moment(value).format("jYYYY-jM-jD"));
  }
  const getDepositeTo = data => {
    console.log("data.id", data);
    setCardId(data.id);
  };

  return (
    <div
      onScroll={onScroll}
      className="orderpayDetail"
      // style={{
      //   height: "180%",
      //   maskImage: height
      //     ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
      //     : null,
      //   WebkitMaskImage: height
      //     ? "linear-gradient(to bottom, black calc(100% - 50px), transparent 100%)"
      //     : null,
      // }}
    >
      <div className="orderpayDetail_header-res">
        <MyOrderIcon className="items-icon" />
        <h3>سفارش‌های من</h3>
      </div>

      {!loading ? (
        <div>
          <div className="orderpayDetail_total">
            <table className="orderpayDetail_table">
              <thead>
                <tr className="orderpayDetail_table-header">
                  <th>شماره سفارش</th>
                  <th style={{ marginLeft: "40px", marginRight: "20px" }}>تاریخ سفارش</th>
                  <th style={{ marginLeft: "40px" }}>مجموع</th>
                  <th style={{ marginLeft: "50px" }}>وضعیت</th>
                </tr>
              </thead>
              <div className="orderpayDetail_total_body-table">
                {orderList
                  .filter(od => od.Id === orderArrayBody)
                  .map(order => (
                    <tbody className="orderpayDetail_tbody collapse" id={`${order.QuoteId}`}>
                      <div className="orderpayDetail_check_icon">
                        <input type="checkbox" checked={true} />
                      </div>

                      <tr className="orderpayDetail_table-body-into act-orderpay">
                        <td className="font-digit">{order.QuoteNumber}</td>
                        <td className="font-digit">
                          {moment(order.QuoteDate).format("jYYYY-jMM-jDD")}
                        </td>
                        <td className="font-digit">
                          {order.Count}محصول/{order.QuoteTotal}ریال
                        </td>
                        <td className="font-digit">در انتظار پرداخت</td>
                      </tr>

                      <div className="orderpayDetail_table-body-into-res act-orderpayDetail-res">
                        <div className="orderpayDetail_table-body-into-res-item">
                          <h4>شماره سفارش</h4>
                          <h4 className="font-digit">{order.QuoteNumber}</h4>
                        </div>
                        <div className="orderpayDetail_table-body-into-res-item">
                          <h4>تاریخ سفارش</h4>
                          <h4 className="font-digit">
                            {moment(order.QuoteDate).format("jYYYY-jMM-jDD")}
                          </h4>
                        </div>
                        <div className="orderpayDetail_table-body-into-res-item">
                          <h4>مجموع</h4>
                          <h4 className="font-digit">{order.QuoteTotal} ریال</h4>
                        </div>
                        <div className="orderpayDetail_table-body-into-res-item">
                          <h4>وضعیت</h4>
                          <h4>در انتظار پرداخت</h4>
                        </div>
                      </div>
                    </tbody>
                  ))}
              </div>
            </table>

            <div className="orderpayDetail_point">
              <h4>
                در صورت تمایل برای خرید حقوقی، لطفا در قسمت اطلاعات شخصی، اطلاعات حقوقی خود را وارد
                کنید
              </h4>
            </div>
            <div className="orderpayDetail_footer-price">
              <h2>
                مجموع سفارش ها:
                <span className="font-digit">
                  {" "}
                  {numberWithCommasAndPersian(
                    orderList.map(order => order.QuoteTotal).reduce((a, b) => a + b, 0)
                  )}{" "}
                  ریال
                </span>
              </h2>
            </div>
          </div>

          <div className="orderpayDetail_payment">
            <div className={`orderpayDetail_payment-option active_payment`}>
              {/* <MonetizationOnIcon /> */}
              <AiFillDollarCircle />
              <h3>پرداخت غیراینترنتی</h3>
              <div className="vlthree"></div>
              <h4>واریز به حساب، کارت به کارت، پایا و ساتا</h4>
            </div>
            <div className="orderpayDetail-payment-line">
              <div className="orderpayDetail-payment-type">
                <h4>روش پرداخت</h4>
                <Dropdown
                  type={"dropdown"}
                  firstData={"یک روش پرداخت را انتخاب کنید"}
                  className="orderpayDetail-payment-type-select"
                  dropData={option}
                  labelField="title"
                  values={comboId}
                  setSelectedState={e => getByText(e)}
                  width="280px"
                  // onChange={val => setComboId(val)}
                  imageSrc={SecondaryArrow}
                />
              </div>
              <div className="vlthree-content"></div>

              <div className="orderpayDetail-payment-type">
                <h4>واریز شده به </h4>
                <Dropdown
                  type={"dropdown"}
                  className="orderpayDetail-payment-type-select font-digit"
                  firstData={"یک روش واریز را انتخاب کنید"}
                  dropData={card}
                  labelField="title"
                  values={cardId}
                  // onChange={val => setCardId(val)}
                  width="290px"
                  imageSrc={SecondaryArrow}
                  setSelectedState={getDepositeTo}
                />
              </div>
            </div>
            <div className="orderpayDetail-payment-line">
              <div className="orderpayDetail-payment-type">
                <h4 style={{ marginLeft: "7px" }}>بانک حساب شما</h4>
                <Dropdown
                  type={"dropdown"}
                  firstData={"انتخاب کنید"}
                  className="orderpayDetail-payment-type-select font-digit"
                  dropData={banks}
                  labelField="title"
                  values={bank}
                  // onChange={val => setBank(val)}
                  setSelectedState={getBank}
                  width="250px"
                  imageSrc={SecondaryArrow}
                  siza="xs"
                />
              </div>
              <div className="vlthree-content"></div>
              {transaction === "کارت به کارت" ? (
                <div className="orderpayDetail-payment-type">
                  <h4>شماره کارت 16 رقمی</h4>
                  <PatternFormat
                    format="####-####-####-####"
                    mask="_"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    className="payment-card-number font-digit"
                  />
                </div>
              ) : (
                <div className="orderpayDetail-payment-type"></div>
              )}
            </div>
            <div className="orderpayDetail-payment-line">
              <div className="orderpayDetail-payment-type extra-input">
                <h4>شناسه پیگیری</h4>
                <input
                  type="text"
                  value={RefId}
                  onChange={e => setRefId(e.target.value)}
                  className="font-digit"
                />
              </div>
              <div className="vlthree-content"></div>
              <div className="orderpayDetail-payment-type extra-input extra-price">
                <h4>مبلغ به ریال</h4>
                <input
                  type="number"
                  className="font-digit"
                  // value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="orderpayDetail-payment-line">
              <div className="orderpayDetail-payment-type extra-input">
                <h4 style={{ marginLeft: "14px" }}>تاریخ واریز</h4>
                <DatePicker
                  className="payment-date font-digit"
                  value={date}
                  onClickSubmitButton={submitExample}
                  // onChange={submitExample}
                />
              </div>
              <div className="vlthree-content"></div>
              <div className="orderpayDetail-payment-type extra-input type-file">
                <h4>تصویر فیش</h4>
                <div className="orderpayDetail-payment-type-label" target="files">
                  <label for="files" className="label-choose-file">
                    بارگذاری فایل
                  </label>
                </div>

                <input
                  className="file-input"
                  id="files"
                  type="file"
                  placeholder="بارگذاری فایل"
                  onChange={handleImage}
                />
                {ImageName?.name !== undefined ? (
                  <div>
                    <h4 className="file-image">{ImageName?.name}</h4>
                    <p className="file-image">{ImageSize}MB</p>
                  </div>
                ) : (
                  <h4 className="file-image">فایلی انتخاب نشده است</h4>
                )}
              </div>
            </div>
            <div className="orderpayDetail-payment-line last-line">
              <div className="orderpayDetail-payment-type extra-input last-line">
                <div style={{ whiteSpace: "noWrap" }}>
                  <h4>نام شخص یا شرکت واریز کننده (صاحب شماره کارت)</h4>
                </div>
                <input
                  type="text"
                  value={AccountOwner}
                  onChange={e => setAccountOwner(e.target.value)}
                  className="font-digit"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="vlthree-content"></div>
            </div>
            <div className="orderpayDetail-payment-line last-line">
              <div className="orderpayDetail-payment-type extra-input last-line">
                <h4>توضیحات</h4>
                <input type="text" value={des} onChange={e => setDes(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="orderpayDetail_footer">
            <a
              href="#"
              className={
                image?.FileContent
                  ? "orderpayDetail_footer-link-route"
                  : "orderpayDetail_footer-link-route-dis"
              }
              onClick={handleFish}
            >
              <h3>ثبت اطلاعات پرداخت</h3>
            </a>
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
            <h1>لطفا منتظر بمانید</h1>
            <MoonLoader color={color} loading={loading} css={override} size={60} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrderPaymentDetail;
