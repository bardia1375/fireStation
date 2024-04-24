/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";

// Components
import { Modal } from "../../../Components/Modal/Modal";

// Images
import Close from "../../../assets/contract/close.svg";
import styled from "styled-components";
import enable from "../../../assets/contract/design-enable.svg";
import disable from "../../../assets/contract/design-disable.svg";
import JahanGostar from "../../../assets/contract/jahangostar.svg";
import ContractsFooter from "../../../assets/contract/contracts-footer.svg";
import ContractsHeader from "../../../assets/contract/contracts-header.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export const ContractsModal = ({
  onClose,
  contracts,
  boxShadow,
  items,
  id,
}) => {
  const closeModalHandler = () => onClose(false);

  const [plansItem, setPlansItem] = useState(items);

  const formatter = new Intl.NumberFormat("fa-IR", {});

  const ref = useRef();

  const [autoClose, setAutoClose] = useState(false);

  useEffect(() => {
    setAutoClose(true);
  }, []);

  //Making customize pdf
  useEffect(() => {
    if (autoClose) {
      html2canvas(ref.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.setFont("Vaziri");
        pdf.setFontSize(20);
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("contracts.pdf");
      });
      onClose(false);
    }
  }, [autoClose]);

  // const x = contracts.map((item) => JSON.parse(item.Items));

  // const y = x.map((item) => item.map((tet) => Object.values(tet)));
  console.log("contractscontractscontracts",contracts);
  console.log("itemsitemsitems",items);
  return (
    <Modal top={"1000000px"} overlayHeight={"0px"} overlayWidth={"0px"}>
      <>
        <CloseBadge onClick={closeModalHandler} src={Close} alt="Close" />
        {/* <div style={{ position: 'absolute', left: '50px', top: '40px', zIndex: '1' }}>
          <Link onClick={downloadHandler} className='mycontractDesign_link-route'>
            <h3>دانلود قراردادها</h3>
          </Link>
        </div> */}
        <ListContainer ref={ref}>
          <BlurGlass />
          <BlurOrangeGlass />
          <HeaderPicture>
            <img
              style={{ paddingLeft: "8px" }}
              width={150}
              src={JahanGostar}
              alt={"JahanGostar"}
            />
          </HeaderPicture>
          <div className="designBodyModal">
            {/* <TopSide>
            <h2>دانلود قراردادها</h2>
          </TopSide> */}
            <HeaderTitle
              style={{ position: "absolute", top: "20px", right: "200px" }}
            >
              <img width={20} src={ContractsHeader} alt={"ContractsHeader"} />
              <span>طرح‌های نرم‌افزار حضوروغیاب</span>
            </HeaderTitle>
            <div style={{ backgroundColor: "white", borderRadius: "12px" }}>
              <div className="designHeader">
                <div style={{ width: "30%", marginRight: "100px" }}>خدمات</div>
                <div style={{ width: "61%" }}>شرح خدمات</div>

                {contracts.map((item, index) => (
                  <div
                    style={{
                      position: "absolute",
                      left: `${index * 120 + 30}px`,
                    }}
                  >
                    <div className={`designColumnModal`}>
                      <span
                        style={{
                          color: `${"darkGrey"}`,
                          position: "absolute",
                          top: "0px",
                          whiteSpace: "nowrap",
                          zIndex: "1",
                          fontFamily: "Yekan Bakh",
                        }}
                      >
                        {item.ContractPackageTitle}
                      </span>
                      {items.map((status, index) =>
                        status[index].IsActive == true ? (
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              padding: "10px",
                              borderRadius: "100%",
                            }}
                            src={enable}
                            alt="enable"
                          />
                        ) : status[index].IsActive == false ? (
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              padding: "10px",
                              borderRadius: "100%",
                            }}
                            src={disable}
                            alt="disable"
                          />
                        ) : (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              padding: "10px",
                              borderRadius: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                              color: "#6FD8DC",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span>{status[index].IsActive}sdc</span>
                          </div>
                        )
                      )}
                    </div>
                    {/* <MoneyCost>{formatter.format(item.Price)}ریال</MoneyCost> */}
                  </div>
                ))}
              </div>
              <div className="designTitlesModal" id={`${id}`}>
                {plansItem.map((plan, index) => (
                  <div>
                    <div
                      className="designItemsModal"
                      style={{
                        paddingRight: "10px",
                        backgroundColor: `${
                          index % 2 == 0 ? "#F5F5F5" : "white"
                        }`,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "Yekan Bakh !important",
                          width: "25%",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                        // className='font-digit'
                      >
                        {plan[index].Name}
                      </h3>
                      <h3 style={{ width: "100%" }}>
                        <div
                          style={{
                            width: "50%",
                            fontSize: "12px",
                            fontWeight: "200",
                            fontFamily: "Yekan Bakh !important",
                          }}
                        >
                          {plan[index]?.Description}
                        </div>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Prices>
              <span style={{ color: "#E67205", fontWeight: "600" }}>قیمت:</span>
              <PriceCount>
                {contracts.map((item, index) => (
                  <>
                    <div
                      style={{
                        width: "75px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {/* {formatter.format(
                        contracts[contracts.length - index - 1].Price
                      )} */}
                      3000
                      ریال
                    </div>
                    {index + 1 !== contracts.length && (
                      <div
                        style={{
                          borderLeft: "1px solid lightGrey",
                          height: "80%",
                        }}
                      />
                    )}
                  </>
                ))}
              </PriceCount>
            </Prices>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              width={800}
              height={40}
              src={ContractsFooter}
              alt="ContractsFooter"
            />
          </div>
        </ListContainer>
      </>
    </Modal>
  );
};

export const Numbers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 50px;
  padding: 20px 40px;
`;

export const HeaderPicture = styled.div`
  position: absolute;
  top: 2px;
  right: 20px;
  background-color: white;
  z-index: 1;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  /* padding: 5px 5px 5px 10px; */
  display: flex;
  justify-content: center;
  align-content: center;
  /* box-shadow: inset 0px -10px 40px #00000017, 0px 24px 100px #a0bdc180; */
`;

export const CloseBadge = styled.img`
  position: absolute;
  top: -4px;
  left: -4px;
  z-index: 3;
  width: 20px;
  height: 20px;
  transition: 300ms;

  :hover {
    transform: scale(1.05);
  }
`;

export const ListContainer = styled.div`
  border-radius: 20px;
  border: 2px solid #cbcbcb;
  background-color: white;
  /* box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180; */
  color: black;
  font-family: Vazir;
  width: 1300px;
  /* height: 800px; */
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  letter-spacing: 0;
`;

export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  /* padding: 20px 40px; */
  font-family: Vazir;
  & > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

export const Prices = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 47px;
  width: 100%;
  font-family: Vazir;
`;

export const PriceCount = styled.div`
  border-radius: 12px;
  color: #e67205;
  display: flex;
  height: 40px;
  gap: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  margin-left: 10px;
  font-family: Vazir;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  /* From https://css.glass */
  /* background: rgba(144, 137, 137, 0.17); */
  border-radius: 16px;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  /* backdrop-filter: blur(6.6px); */
  /* -webkit-backdrop-filter: blur(6.6px); */
  border: 1px solid lightGrey;
`;

export const MoneyCost = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  color: black;
`;

export const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 5px 20px;
  gap: 10px;
  background: transparent linear-gradient(268deg, #f1f5f5 0%, #d5fcfc 100%) 0%
    0% no-repeat padding-box;
  border: 1px solid #e2f1f4;
  border-radius: 12px;
  opacity: 1;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
`;

export const BlurGlass = styled.div`
  /* From https://css.glass */
  width: 200px;
  height: 20px;
  z-index: 1;
  background: #d9eef370;
  border-radius: 16px;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(-5px);
  transform: matrix(-10, 10, 5, 0, 10, 0);
  -webkit-backdrop-filter: blur(7.9px);
  /* border: 1px solid #c6e0e670; */
  position: absolute;
  top: 0;
  left: 300px;
`;

export const BlurOrangeGlass = styled.div`
  /* From https://css.glass */
  width: 200px;
  height: 20px;
  z-index: 1;
  background: #f5f3c170;
  border-radius: 16px;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(-5px);
  transform: matrix(-10, 10, 1, 0, 10, 0);
  -webkit-backdrop-filter: blur(7.9px);
  /* border: 1px solid #c6e0e670; */
  position: absolute;
  top: 0;
  left: 150px;
`;
