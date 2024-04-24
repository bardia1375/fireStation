import React from 'react';
import { useState } from 'react';
import VideoList from './VideoList';
import { Modal } from '../Commons';

function Accordion({ page,TableData, index, contentCtrl, item, AccordionTitle }) {
  const [isModal, setIsModal] = useState(false);

const  openModal=()=>{
  setIsModal(true)
}
console.log("TableData[index]",TableData[index]);
  return (
    <div className={`${contentCtrl}`}>
     {isModal&& <div>
          <Modal background>
            <VideoList setIsModal={setIsModal}/>
          </Modal>
      </div>}
      <div className="inner_content">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)",justifyContent:'flex-end',alignItems:"flex-end"}}>
          {AccordionTitle?.length!==0 && AccordionTitle[index].map((el, i) => (
            <div key={i} className="order_body-item">
              <tr className="order_body-item-into-first">
                <td style={{ fontFamily: "Vazir",whiteSpace:"noWrap" }}>{el.title}</td>
                <div className="vltwo"></div>
                <a className="font-digit" style={{ fontFamily: "Vazir",cursor:el?.link ?"pointer":"" ,color:el?.link ?"red":""}} onClick={el?.link ?()=>openModal():""}>
                  {el.value} 
                </a>
              </tr>
            </div>
          ))}
        </div>

       {page=="سفارش" &&<div className="order_body-item last-child">
          <tr className="order_body-item-into-price">
            <td className="font-digit" style={{ fontFamily: "Vazir" }}>
              قیمت نهایی: {TableData[index]?.QuoteTotal?.toLocaleString()} ریال
            </td>
          </tr>
        </div>}
      </div>
{/* 
      <div className="inner_content-res">
        <div className="order_body-item-res">
          <div className="order_body-item-res-line">
            <h4 style={{ marginRight: "5px" }}>کیوسک اطلاع رسانی k22*1</h4>
          </div>
          <div className="order_body-item-res-line">
            <h4>قیمت</h4>
            <h4 className="font-digit">
              {TableData[index]?.Sum?.toLocaleString()} ریال
            </h4>
          </div>
          <div className="order_body-item-res-line">
            <h4>مجموع</h4>
            <h4 className="font-digit">
              {TableData[index]?.Price?.toLocaleString()} ریال
            </h4>
          </div>
          <div className="order_body-item-res-line">
            <h4>حمل و نقل</h4>
            {TableData[index].Transfer === 0 ? (
              <h4>رایگان</h4>
            ) : (
              <h4 className="font-digit">
                {TableData[index]?.Transfer?.toLocaleString()}
              </h4>
            )}
          </div>
          <div className="order_body-item-res-line">
            <h4>مالیات</h4>
            <h4 className="font-digit">
              {TableData[index]?.Vat?.toLocaleString()} ریال
            </h4>
          </div>
          {item[3] !== "لغو شده" && (
            <div className="order_body-item-res-line">
              <div className="order_body-item-into-factor">
                <a href="#">دریافت پیش فاکتور</a>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Accordion;
