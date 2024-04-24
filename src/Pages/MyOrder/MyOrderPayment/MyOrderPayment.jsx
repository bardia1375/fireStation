import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyOrderPayment.css";
// import './style/GlobalStyle.css';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import PaymentIcon from '@mui/icons-material/Payment';
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import { ReactComponent as MyOrderIcon } from "../../../assets/orders/myorder.svg";
import { getOneDataService } from "../../../Services/DevicesServices";
import { AiFillDollarCircle, AiFillCreditCard } from "react-icons/ai";
import serverApi, { setAuthToken } from "../../../Services/httpService";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import { numberWithCommasAndPersian } from "../../../Components/Commons/NumberToPersian";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function MyOrderPayment({ orderArr, token, orderArrayBody }) {
  const [orderList, setOrderList] = useState([]);
  const [intCheck, setIntCheck] = useState(false);
  const [noIntCheck, setNoIntCheck] = useState(false);
  const [urlAddress, setUrlAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(true);
  let [color, setColor] = useState("#0b647c");
  useEffect(() => {
    setAuthToken();
  }, []);
  const { TableItem } = useSelector(state => state.tableData);
  useEffect(() => {
    getOneDataService("QuoteGet", selectedItems)
      .then(res => {
        setOrderList([res.data.Data][0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const { selectedItems } = useSelector(state => state.tableData);
  const handleOrderNoInternet = () => {
    setNoIntCheck(true);
    setIntCheck(false);
    setUrlAddress("");
  };
  const handleOrderWithInternet = () => {
    setIntCheck(true);
    setNoIntCheck(false);
    const formData = new FormData();
    // formData.append(
    //   "OrderId",
    //   orderList?.filter(
    //     (od) => od.Id === orderArrayBody
    //     // orderArrayBody?.some((od2) => od.Id === od2.id)
    //   )[0].Number
    // );
    serverApi
      .post(`BPayment`, formData)
      .then(res => {
        setUrlAddress(res.data.Data);
      })
      .catch(err => {
        console.log(err.message);
      });
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

  console.log("urlAddressurlAddress", orderList);

  return (
    <div
      onScroll={onScroll}
      className="orderpay"
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
      <div className="orderpay_header-res">
        <MyOrderIcon className="items-icon" />
        <h3>سفارش‌های من</h3>
      </div>

      {!loading ? (
        <div>
          <div className="orderpay_total">
            <table className="orderpay_table">
              <thead>
                <tr className="orderpay_table-header">
                  <th>شماره سفارش</th>
                  <th style={{ marginLeft: "40px" }}>تاریخ سفارش</th>
                  <th style={{ marginLeft: "40px" }}>مجموع</th>
                  <th style={{ marginLeft: "50px" }}>وضعیت</th>
                </tr>
              </thead>
              <div className="orderpay_total_body-table">
                {orderList.map(order => (
                  <tbody className="orderpay_tbody collapse" id={`${order.QuoteId}`}>
                    <div className="orderpay_check_icon">
                      <input type="checkbox" checked={true} />
                    </div>

                    <tr className="orderpay_table-body-into act-orderpay">
                      <td className="font-digit">{order.QuoteNumber}</td>
                      <h4 className="font-digit-date">
                        {moment(order.QuoteDate).format("jYYYY-jMM-jDD")}
                      </h4>
                      <td className="font-digit">
                        {numberWithCommasAndPersian(order.QuoteTotal)} ریال/
                        {order.Products.map(el => el.Quantity)} محصول
                      </td>
                      <td className="font-digit">در انتظار پرداخت</td>
                    </tr>

                    <div className="orderpay_table-body-into-res act-orderpay-res">
                      <div className="order_table-body-into-res act-order-res">
                        <div className="order_table-body-into-res-item">
                          <h4>شماره سفارش</h4>
                          <h4 className="font-digit">{order.QuoteNumber}</h4>
                        </div>
                        <div className="order_table-body-into-res-item">
                          <h4>تاریخ سفارش</h4>
                          <h4 className="font-digit-date">
                            {moment(order.QuoteDate).format("JYYYY-JMM-JDD")}
                          </h4>
                        </div>
                        <div className="order_table-body-into-res-item">
                          <h4>مجموع</h4>
                          <h4 className="font-digit">
                            {/* {order.Sum.toLocaleString()} ریال */}
                            {numberWithCommasAndPersian(order.QuoteTotal)} ریال
                          </h4>
                        </div>
                        <div className="order_table-body-into-res-item">
                          <h4>وضعیت</h4>
                          <h4>در انتظار پرداخت</h4>
                        </div>
                      </div>
                    </div>
                  </tbody>
                ))}
              </div>
            </table>

            <div className="orderpay_point">
              <h4>
                در صورت تمایل برای خرید حقوقی، لطفا در قسمت اطلاعات شخصی، اطلاعات حقوقی خود را وارد
                کنید
              </h4>
            </div>
            <div className="orderpay_footer-price">
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
          <div className="orderpay_payment">
            <div
              className={`orderpay_payment-option ${
                intCheck ? "deActive_payment" : "active_payment"
              }`}
              onClick={handleOrderNoInternet}
            >
              <input type="radio" checked={noIntCheck} onChange={handleOrderNoInternet} />
              <div className="vlthree"></div>
              {/* <MonetizationOnIcon /> */}
              <AiFillDollarCircle color="#37b3b8" />
              <h3>پرداخت غیراینترنتی</h3>
              <div className="vlthree vlthree-edit"></div>
              <h4>واریز به حساب، کارت به کارت، پایا و ساتا</h4>
            </div>
            <div
              className={`orderpay_payment-option ${
                intCheck ? "active_payment" : "deActive_payment"
              }`}
              onClick={handleOrderWithInternet}
            >
              <input type="radio" checked={intCheck} onChange={handleOrderWithInternet} />
              <div className="vlthree"></div>
              {/* <PaymentIcon /> */}
              <AiFillCreditCard />
              <h3>پرداخت اینترنتی</h3>
              <div className="vlthree vlthree-edit"></div>
              <h4>پرداخت آنلاین با همه کارت های بانکی</h4>
            </div>
          </div>
          <div className="orderpay_footer-price-res">
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

          <div className="orderpay_footer">
            {!intCheck && !noIntCheck ? (
              // <a
              //   className='orderpay_footer-disable-link-route'
              //   referrerpolicy='origin'
              //   target='_blank'
              // >
              //   <h3>نوع پرداخت را انتخاب نمایید</h3>
              // </a>
              <Link className="orderpay_footer-disable-link-route">
                <h3>نوع پرداخت را انتخاب نمایید</h3>
              </Link>
            ) : intCheck ? (
              <a
                className="orderpay_footer-link-route"
                referrerpolicy="origin"
                target="_blank"
                href={urlAddress}
              >
                <h3>پرداخت</h3>
              </a>
            ) : (
              // <a
              //   className="orderpay_footer-link-route_disable"
              //   // referrerpolicy='origin'
              //   // target='_blank'
              //   // href={urlAddress}
              // >
              //   <h3>غیر فعال</h3>
              // </a>
              <Link to="/myorder/payment/confirm" className="orderpay_footer-link-route">
                <h3>افزودن اطلاعات پرداخت</h3>
              </Link>
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

export default MyOrderPayment;
