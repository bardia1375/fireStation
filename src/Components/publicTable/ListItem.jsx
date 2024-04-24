/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Redux
// import { changeInformationMethodStatus } from "routes/Home/Employees/Module";

// Components
import { DeleteModal } from "./deleteModal/DeleteModal";
import { Typography } from "../Commons/Typography";
import { CloneModal } from "./cloneModal/CloneModal";

// Styled Elements
import { PublicTableComponent } from ".";

// Images
import Mail from "../../assets/item-actions/mail.svg";
import Copy from "../../assets/item-actions/copy.svg";
import Pen from "../../assets/item-actions/pen.svg";
import Trash from "../../assets/item-actions/trash-white-color-red-bg.svg";
import TrashRed from "../../assets/item-actions/trash-red-color-white-bg.svg";
import Recovery from "../../assets/item-actions/recovery.svg";
import Setting from "../../assets/item-actions/setting.svg";
import Status from "../../assets/item-actions/status.svg";
import Inner from "../../assets/item-actions/inner.svg";
import questioMark from "../../assets/item-actions/google-adsense-svgrepo-com.svg";

import Outer from "../../assets/item-actions/outer.svg";
import DisabledInner from "../../assets/item-actions/disabled-inner.svg";
import DisabledOuter from "../../assets/item-actions/disabled-outer.svg";
import { useEffect } from "react";
import { Field } from "../../Components/Commons/Field";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import serverApi from "../../Services/httpService";
import Swal from "sweetalert2";
import { getAllData, getId } from "../../Actions/Table/table";
import "./ListItem.css";
import MyOrder from "../../Pages/MyOrder/MyOrder";
import { Modal } from "../Commons";
import VideoList from "./VideoList";
import Accordion from "./Accordion";
export const ListItem = ({
  page,
  description,
  hoverDetail,
  navigateAddress,
  navigateDetailAddress,
  navigateEditAddress,
  items,
  column,
  statusObjStyle,
  setCurrentPage,
  currentPage,
  fetchDeleteData,
  fetchRecoverData,
  fetchCloneData,
  hoverActionItems,
  recoveryButton,
  mailButton,
  copyButton,
  penButton,
  trashButton,
  trashRedButton,
  settingButton,
  innerButton,
  outerButton,
  hoverMode,
  editDisplayed,
  noBorderButton,
  checkBox,
  checkBoxHandler,
  listChecker,
  noCheckHandler,
  editStarter,
  startersNoRemove,
  TableData,
  index,
  setItem,
  item,
  refresh,
  setRefresh,
  contractStyle,
  preOrder,
  facilitiUrl,
  facilitiesTitle,
  setPurchaseButton,
  purchasebutton,
  onRowClick,
  getItemOne,
  accordion,
  AccordionTitle,
  handleGetItemOne,
  textAccordion,
}) => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // States
  const [isHover, setIsHover] = useState(hoverActionItems ? false : true);
  const [isHoverDetail, setIsHoverDetail] = useState(hoverDetail ? false : true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const deleteModeChangeHandler = bool => setIsDeleteMode(bool);
  const [isCloneMode, setIsCloneMode] = useState(false);
  const cloneModeChangeHandler = bool => setIsCloneMode(bool);
  const { Token } = useSelector(state => state.auth);
  // Redux
  const changeStatusHandler = method => dispatch();
  // changeInformationMethodStatus({
  //   unique: items[items.length - (hoverDetail ? 2 : 1)],
  //   method,
  // })
  const recoverData = () => {
    dispatch(fetchRecoverData(Token, items[items.length - (hoverDetail ? 2 : 1)], currentPage));
    setCurrentPage(1);
  };
  // Navigators
  const goToDetailPageHandler = () => {
    if (editDisplayed !== undefined) {
      const template = {
        Displayed: true,
        Unique: items[items.length - (hoverDetail ? 2 : 1)],
      };
      dispatch(editDisplayed(Token, template));
    }
    if (navigateDetailAddress) {
      history.push(`${navigateDetailAddress}${items[items.length - (hoverDetail ? 2 : 1)]}`, {
        state: {
          from: location?.pathname,
          currentPage: currentPage,
        },
      });
    }
  };
  const goToEditPageHandler = () =>
    history.push(`${navigateEditAddress}${items[items.length - (hoverDetail ? 2 : 1)]}`, {
      state: {
        ...items,
        from: location?.pathname,
        currentPage: currentPage,
      },
    });
  // const goToSendMessagePageHandler = () =>
  //   navigate("/employees/send-message", { state: { ...items } });

  useEffect(() => {
    if (isDeleteMode && hoverMode) {
      setIsHover(false);
    }
    if (isDeleteMode) {
      setIsHoverDetail(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteMode]);

  const handleOverChange = () => {
    if (!isDeleteMode && hoverActionItems) {
      setIsHover(true);
    } else if (!isDeleteMode && hoverDetail) {
      setIsHoverDetail(true);
    }
  };
  const handleOutChange = () => {
    if (hoverActionItems) {
      setIsHover(false);
    } else if (hoverDetail) {
      setIsHoverDetail(false);
    }
  };

  const [listExist, setListExist] = useState(false);

  useEffect(() => {
    let checker = 0;
    listChecker?.map(item => {
      if (item.unique === items[items.length - 1]) {
        checker += 1;
      }
    });
    if (checker > 0) {
      setListExist(true);
    } else {
      setListExist(false);
    }
  }, [listChecker]);

  // const sweetAlerting = (e) => {
  //   Swal({
  //     title: 'آیا از حذف این سفارش مطمئن هستید؟',
  //     buttons: ['خیر', 'بله'],
  //   }).then((res) => {
  //     if (res) {
  //       //console.log(res)

  //       const formData = new FormData();
  //       formData.append('Id', e);

  //       axios
  //         .post(`${process.env.REACT_APP_API_BASE_URL}/v2/DeleteOrder`, formData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => {
  //           //setDeleteOrd(res.data);
  //           if (res.data.StatusCode === 0) {
  //             fetchOrders();
  //             swal({
  //               text: 'سفارش شما با موفقیت حذف شد',
  //               icon: 'success',
  //               timer: 2500,
  //             });
  //           } else {
  //             fetchOrders();
  //             swal({
  //               text: 'حذف سفارش با مشکل روبه رو شده است',
  //               icon: 'error',
  //               timer: 2500,
  //             });
  //           }
  //         })

  //         .catch((err) => {
  //           //console.log(err.message)
  //         });
  //     } else {
  //       //nothing
  //     }
  //   });
  // };

  const getItem = async (e, particularItem) => {
    setPurchaseButton(e);
    handleGetItemOne(particularItem);
    dispatch(getId(item));
    e.stopPropagation();
  };

  const sweetAlerting = e => {
    Swal.fire({
      title: `آیا میخواهید این ${page} را حذف کنید؟`,
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
      showCloseButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("Id", e.Id);

        serverApi
          .post(`DeleteOrder`, formData)
          .then(res => {
            //setDeleteOrd(res.data);
            if (res.data.StatusCode === 0) {
              dispatch(getAllData("Orders", "SET-ORDER"));
              Swal.fire({
                text: "سفارش شما با موفقیت حذف شد",
                icon: "success",
                timer: 2500,
              });
              setRefresh(!refresh);
            } else {
              dispatch(getAllData("Orders", "SET-ORDER"));
              Swal.fire({
                text: "حذف سفارش با مشکل روبه رو شده است",
                icon: "error",
                timer: 2500,
              });
              setRefresh(!refresh);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //nothing
      }
    });
  };
  const [contentCt, setContentCt] = useState(false);

  let contentCtrl = "content_back";
  if (contentCt) {
    contentCtrl = "content";
  }

  const changeContentCt = id => {
    if (item?.map(order => order.Id == id)) {
      setContentCt(!contentCt);
    } else {
      // nothing
    }
  };
  const handleDownload = (event, id) => {
    // event.stopPropagation();
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = id;
    anchor.download = "Invoice.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const openModal = () => {
    setIsModal(true);
  };
  //   const downloadLink = "http://5.200.70.115:9658/Report/?ty=Quote&id=6e20225b-a662-ee11-a028-000c29580b63";

  // useEffect(() => {
  //   const anchor = document.createElement("a");
  //   anchor.style.display = "none";
  //   anchor.href = downloadLink;
  //   anchor.download = "yourFileName.pdf";
  //   document.body.appendChild(anchor);
  //   anchor.click();
  //   document.body.removeChild(anchor);
  // }, [downloadLink]);
  return (
    <div style={{ position: "relative" }} onClick={() => onRowClick(item)}>
      {isDeleteMode && (
        <DeleteModal
          type={page}
          onClose={deleteModeChangeHandler}
          items={items}
          fetchDeleteData={fetchDeleteData}
          navigateAddress={navigateAddress}
          setCurrentPage={setCurrentPage}
          hoverDetail={hoverDetail}
        />
      )}
      {isCloneMode && (
        <CloneModal
          type={page}
          fetchCloneData={fetchCloneData}
          setCurrentPage={setCurrentPage}
          navigateAddress={navigateAddress}
          onClose={cloneModeChangeHandler}
          unique={items[items.length - (hoverDetail ? 2 : 1)]}
        />
      )}
      <PublicTableComponent.ListItem
        onMouseOver={handleOverChange}
        onMouseLeave={handleOutChange}
        statusObjStyle={statusObjStyle}
        contractStyle={contractStyle}
        page={page}
        grid={page !== "گزارش‌ها" ? column : column - 1}
        isDeleteMode={isDeleteMode}
        onClick={() => {
          changeContentCt(TableData?.length > 0 && TableData[index]?.Id);
        }}
      >
        {/* checkBox */}
        {checkBox && (
          // <div
          //   style={{
          //     position: "absolute",
          //     right: "-8%",
          //     bottom: "50%",
          //     transform: "translate(-50%,-50%)",
          //   }}
          // >
          //   <Field
          //     // onChange={(e) =>
          //     //   // noCheckHandler && noCheckHandler !== items[items.length - 1]
          //     //   //   ? () => {}
          //     //   // :
          //     //   listExist && startersNoRemo,ve
          //     //     ? () => {}
          //     //     : noCheckHandler
          //     //     ? editStarter({
          //     //         name: e.target.value,
          //     //         unique: items[items.length - 1],
          //     //         position: items[items.length - 2],
          //     //       })
          //     //     : checkBoxHandler({
          //     //         name: e.target.value,
          //     //         unique: items[items.length - 1],
          //     //         position: items[items.length - 2],
          //     //       })
          //     // }
          //     //  checked={listExist}
          //     // value={items[0]}
          //     type={"checkbox"}
          //     disabled={items[3] !== "در انتظار پرداخت"}
          //     onClick={(e) => getItem(e)}
          //   />
          // </div>
          <span className="order_check_icon">
            <input
              disabled={
                item[item.length - 2].includes("لغو شده") ||
                item[item.length - 2].includes("پرداخت شده") ||
                item[item.length - 2].startsWith("فعال")
              }
              type="checkbox"
              onChange={e => getItem(e.target.checked, item)}
              onClick={e => e.stopPropagation()}
              // disabled={items[3] !== "در انتظار پرداخت"}
            />
          </span>
        )}
        {/* hoverDetail */}
        {items?.map((item, index) =>
          (
            hoverDetail
              ? index !== items.length - 1 && index !== items.length - 2
              : index !== items.length - 1
          ) ? (
            <div className="ListItemTypography">
              <Typography
                cursor={"pointer"}
                size="sm"
                key={index}
                onClick={goToDetailPageHandler}
                weight="light"
                statusType={
                  items.length - (hoverDetail ? 3 : 2) === index && isHover && hoverMode
                    ? true
                    : false
                }
              >
                {items.length - (hoverDetail ? 3 : 2) === index && isHover && hoverMode ? (
                  <PublicTableComponent.ListItemActions type={"status"}>
                    <img src={Status} alt="Status" onClick={goToEditPageHandler} />
                  </PublicTableComponent.ListItemActions>
                ) : item?.toString().includes("www") ? (
                  <div style={{ color: "red" }} onClick={() => openModal()}>
                    مشاهده
                  </div>
                ) : (
                  item
                )}
              </Typography>
            </div>
          ) : null
        )}

        {isModal && (
          <div>
            <Modal background>
              <VideoList setIsModal={setIsModal} />
            </Modal>
          </div>
        )}

        {hoverDetail && isHoverDetail && (
          <PublicTableComponent.HoverDetail>
            توضیحات:
            <Typography size="sm">
              {items[items.length - 1] ? items[items.length - 1] : "توضیحاتی ثبت نشده است!"}
            </Typography>
          </PublicTableComponent.HoverDetail>
        )}
        <PublicTableComponent.HoverActions>
          {preOrder && item[3] !== "پرداخت شده" && item[3] !== "لغو شده" ? (
            <Link
              className="order_body-item-into-factor"
              onClick={() => {
                handleDownload(event => event, TableData[index].DownloadLink);
              }}
            >
              دریافت پیش فاکتور
            </Link>
          ) : (
            ""
          )}
          {!!facilitiesTitle && (
            <Link
              to={`${facilitiUrl + TableData[index].CustomerSoftwareId}`}
              className="order_body-item-into-factor"
              onClick={() => {
                console.log("TableData[index].Id", TableData);
              }}
            >
              <div style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold" }}>
                {facilitiesTitle}
              </div>
              {/* <img
                    src={questioMark}
                    width="24px"
                    height="24px"
              style={{transform:"translateY(4px)"}}

                    alt="Inner"
                    onClick={goToEditPageHandler}
                      /> */}
            </Link>
          )}

          {accordion &&
            (textAccordion ? (
              <Link
                className="order_body-item-into-factor"
                onClick={() => {
                  console.log("TableData[index].Id", TableData);
                }}
              >
                {textAccordion && (
                  <div style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold" }}>
                    اطلاعات
                  </div>
                )}{" "}
                {/* <img
                    src={questioMark}
                    width="24px"
                    height="24px"
              style={{transform:"translateY(4px)"}}

                    alt="Inner"
                    onClick={goToEditPageHandler}
                      /> */}
              </Link>
            ) : (
              <Link
                onClick={() => {
                  console.log("TableData[index].Id", TableData);
                }}
              >
                {/* <img
                  src={questioMark}
                  width="24px"
                  height="24px"
            style={{transform:"translateY(4px)"}}

                  alt="Inner"
                  onClick={goToEditPageHandler}
                    /> */}
              </Link>
            ))}
          {isHover
            ? !isDeleteMode &&
              page !== "گزارش‌ها" && (
                <PublicTableComponent.ListItemActions noBorderButton={true}>
                  {recoveryButton && <img src={Recovery} alt="Recovery" onClick={recoverData} />}

                  {mailButton && (
                    <img
                      src={Mail}
                      alt="Mail"
                      // onClick={goToSendMessagePageHandler}
                    />
                  )}

                  {copyButton && (
                    <img src={Copy} alt="Copy" onClick={cloneModeChangeHandler.bind(null, true)} />
                  )}

                  {penButton && <img src={Pen} alt="Pen" onClick={goToEditPageHandler} />}

                  {innerButton && items[items.length - (hoverDetail ? 3 : 2)] === "متصل" && (
                    <img src={Inner} alt="Inner" onClick={goToEditPageHandler} />
                  )}
                  {outerButton && items[items.length - (hoverDetail ? 3 : 2)] === "متصل" && (
                    <img src={Outer} alt="Outer" onClick={goToEditPageHandler} />
                  )}
                  {innerButton && items[items.length - (hoverDetail ? 3 : 2)] !== "متصل" && (
                    <img src={DisabledInner} alt="Inner" onClick={goToEditPageHandler} />
                  )}
                  {outerButton && items[items.length - (hoverDetail ? 3 : 2)] !== "متصل" && (
                    <img src={DisabledOuter} alt="Outer" onClick={goToEditPageHandler} />
                  )}
                  {settingButton && (
                    <img src={Setting} alt="Setting" onClick={goToEditPageHandler} />
                  )}

                  {/* {trashButton ||
                    (items[3] === "در انتظار پرداخت" && (
                      <div className="trashImg">
                        <img
                          src={Trash}
                          alt="Trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => sweetAlerting(TableData[index])}
                        />
                      </div>
                    ))} */}
                  {/* {trashRedButton && (
                    <img
                      src={TrashRed}
                      alt="TrashRed"
                      onClick={deleteModeChangeHandler.bind(null, true)}
                    />
                  )} */}
                </PublicTableComponent.ListItemActions>
              )
            : // <img src={Dots} alt="Dots" height={25} />
              !isDeleteMode && <PublicTableComponent.Dots>⋮</PublicTableComponent.Dots>}
        </PublicTableComponent.HoverActions>
      </PublicTableComponent.ListItem>
      {accordion ? (
        <Accordion
          page={page}
          TableData={TableData}
          index={index}
          contentCtrl={contentCtrl}
          item={item}
          AccordionTitle={AccordionTitle}
        />
      ) : null}
    </div>
  );
};
