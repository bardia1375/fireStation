import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Components
import { Typography, Button, Modal } from "../Commons";
import { ListItem } from "./ListItem";

// Styled Elements
import { PublicTableComponent } from "./index";

// Images
// import Upload from "assets/images/employees/upload.svg";
import Plus from "../../assets/item-actions/plus-white-color.svg";
import { useState } from "react";
import Pagination from "./pagination/Pagination";
import LoadingSpinner from "./loading/LoadingSpinner";
import { AddModal } from "./addModal/AddModal";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ConfigureButton } from "../../assets/styles/layout/Calendar";
import { getAllSoftwareFeatures, getSelectedItems } from "../../Actions/Table/table";
import { CustomerSoftwareFeaturesBuy } from "Services/softwareServices";

let pageSize = 10;

export const TableList = ({
  page,
  addModalDescription,
  description,
  hoverDetail,
  dropData,
  titles,
  data,
  column,
  buttonTitle,
  purchase,
  loading,
  pagination,
  fetchData,
  fetchDeleteData,
  fetchRecoverData,
  fetchCloneData,
  navigateAddress,
  navigateNewAddress,
  navigateDetailAddress,
  navigateEditAddress,
  noAddModal,
  hoverActionItems,
  tabsData,
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
  reportType,
  editDisplayed,
  noBorderButton,
  checkBox,
  checkBoxHandler,
  listChecker,
  noCheckHandler,
  editStarter,
  startersNoRemove,
  TableData,
  setItem,
  item,
  setRefresh,
  refresh,
  contractPage,
  preOrder,
  facilitiUrl,
  facilitiesTitle,
  onRowClick,
  accordion,
  AccordionTitle,
  textAccordion,
  getUniqueSoftwareId,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const changePageHandler = (path, opt) => history.push(path, opt);
  const { Token } = useSelector(state => state.auth);
  const [isAddMode, setIsAddMode] = useState(false);
  const [purchasebutton, setPurchaseButton] = useState();
  const addModeChangeHandler = bool => setIsAddMode(bool);
  const navigate = useHistory();
  let [selectedRow, setSelectedRow] = useState([]);
  let [selectedRowId, setSelectedRowId] = useState([]);

  // Use a Set to keep track of unique last elements
  const uniqueKeys = new Set();
  const filteredData = [];

  // states for pagination
  const [currentPage, setCurrentPage] = useState(
    location?.state?.currentPage ? location?.state?.currentPage : 1
  );
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * pageSize;
  //   const lastPageIndex = firstPageIndex + pageSize;
  //   return data?.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, data]);
  useEffect(() => {
    if (fetchData !== undefined) {
      dispatch(fetchData(Token, currentPage, pageSize, reportType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  const [win, setWin] = useState();
  const [getitem, setgetItem] = useState();
  const handleGetItemOne = el => {
    // Create a Set to keep track of the last elements
    setgetItem(el);
    setSelectedRow([...selectedRow, el]);
    setWin(el);
  };

  useEffect(() => {
    const uniqueSoftwareId = selectedRow.map(item => {
      return item ? item[item?.length - 1] : "";
    });
    setSelectedRowId(uniqueSoftwareId);
    console.log("uniqueSoftwareIduniqueSoftwareId", uniqueSoftwareId);
    dispatch(getSelectedItems(uniqueSoftwareId));
    if (!purchasebutton) {
      if (uniqueSoftwareId.includes(win ? win[win?.length - 1] : "")) {
        const deleteIndex = uniqueSoftwareId.indexOf(win[win?.length - 1]);
        const updatedSelectedRow = [...selectedRow];
        updatedSelectedRow.splice(deleteIndex, 1);
        setSelectedRow(updatedSelectedRow);
      } else {
      }
    } else {
    }
  }, [selectedRow, win, getitem]);
  // getUniqueSoftwareId(selectedRowId);

  const BuyModules = async () => {
    navigate.push("/myorder");

    const body = {
      SoftwareFeautureId: selectedRowId,
      CustomerSoftwareId: TableData?.length > 0 && TableData[0]?.CustomerSoftwareId,
    };
    await CustomerSoftwareFeaturesBuy(body);
  };
  return (
    <PublicTableComponent.SContainer>
      {/* {isAddMode && (
        <AddModal
          dropData={dropData}
          addModalDescription={addModalDescription}
          type={page}
          onClose={addModeChangeHandler}
          navigateNewAddress={navigateNewAddress}
        />
      )} */}
      <PublicTableComponent.ContainerHeader>
        {tabsData ? (
          <div>
            {tabsData.map((item, index) => (
              <PublicTableComponent.HeaderButton
                key={index}
                path={location?.pathname.includes(item.navAddress)}
                onClick={() => changePageHandler(item.navAddress)}
              >
                <Typography>{item.title}</Typography>
              </PublicTableComponent.HeaderButton>
            ))}
            {/* <PublicTableComponent.HeaderButton
              path={location?.pathname.includes("/reports/employee-list")}
              onClick={() => changePageHandler("/reports/employee-list")}
            >
              <Typography>گزارش‌های کارمندان</Typography>
            </PublicTableComponent.HeaderButton> */}
          </div>
        ) : (
          <PublicTableComponent.HeaderActions />
        )}
        <PublicTableComponent.HeaderActions>
          {purchase && selectedRow.length>0 && (
            <Button
              //  disabled={!purchasebutton}
              onClick={() => BuyModules()}
              variant="linear"
              display="flex"
              justify="space-between"
              // width="160px"
              // padding="4px 12px"
              radius="24px"
              borderStyle="none"
              color="white"
              bg={"linear-gradient(to left, #fdcd5c, #f38a39)"}
              shadow="0px 7px 15px #00000033"
            >
              <Typography>خرید</Typography>
            </Button>
          )}

          {buttonTitle && (
            //   <Button
            //   onClick={() => changePageHandler("/employees/new-employee")}
            //   variant="linear"
            //   display="flex"
            //   align="center"
            //   padding="2px 15px"
            //   radius="32px"
            //   bg="linear-gradient(to left,#37ABB8 0% ,#71FBFF 100%)"
            //   color="white"
            // >
            <Link to={navigateNewAddress}>
              <Button
                onClick={
                  noAddModal
                    ? () => changePageHandler(navigateNewAddress)
                    : addModeChangeHandler.bind(null, true)
                }
                variant="linear"
                display="flex"
                justify="space-between"
                // width="160px"
                padding="4px 12px"
                radius="24px"
                borderStyle="none"
                color="white"
                bg="linear-gradient(252deg, #37abb8 0%, #71fbff 100%)"
                shadow="0px 7px 15px #00000033"
              >
                <Typography>{buttonTitle}</Typography>
                <PublicTableComponent.HeaderImage src={Plus} alt="Plus" />
              </Button>
            </Link>
          )}
        </PublicTableComponent.HeaderActions>
      </PublicTableComponent.ContainerHeader>
      <PublicTableComponent.ContainerBody>
        <PublicTableComponent.ListHead grid={page !== "گزارش‌ها" ? column : column - 1}>
          {titles &&
            titles.map(item => (
              <Typography size="sm" key={item.title}>
                {item.title}
              </Typography>
            ))}
        </PublicTableComponent.ListHead>

        <PublicTableComponent.ListBody>
          {loading === true && (data === undefined || data === null) ? (
            <LoadingSpinner />
          ) : loading === false && (data === undefined || data === null) ? (
            <span style={{ display: "flex", justifyContent: "center" }}>
              داده ای برای نمایش وجود ندارد !
            </span>
          ) : data?.length !== 0 ? (
            data?.map((item, idx) => (
              <ListItem
                textAccordion={textAccordion}
                handleGetItemOne={handleGetItemOne}
                setPurchaseButton={setPurchaseButton}
                purchasebutton={purchasebutton}
                refresh={refresh}
                preOrder={preOrder}
                setRefresh={setRefresh}
                setItem={setItem}
                TableData={TableData}
                index={idx}
                page={page}
                description={description}
                hoverDetail={hoverDetail}
                hoverActionItems={hoverActionItems}
                statusObjStyle={item[item.length - (hoverDetail ? 3 : 2)]}
                contractStyle={item[item.length - (hoverDetail || contractPage ? 3 : 0)]}
                key={item[item?.length - (hoverDetail ? 2 : 1)]}
                items={item}
                column={column}
                accordion={accordion}
                fetchDeleteData={fetchDeleteData}
                fetchRecoverData={fetchRecoverData}
                fetchCloneData={fetchCloneData}
                navigateAddress={navigateAddress}
                navigateDetailAddress={navigateDetailAddress}
                navigateEditAddress={navigateEditAddress}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                recoveryButton={recoveryButton}
                mailButton={mailButton}
                copyButton={copyButton}
                penButton={penButton}
                trashButton={trashButton}
                trashRedButton={trashRedButton}
                settingButton={settingButton}
                innerButton={innerButton}
                outerButton={outerButton}
                hoverMode={hoverMode}
                editDisplayed={editDisplayed}
                noBorderButton={noBorderButton}
                checkBox={checkBox}
                checkBoxHandler={checkBoxHandler}
                listChecker={listChecker}
                noCheckHandler={noCheckHandler}
                editStarter={editStarter}
                startersNoRemove={startersNoRemove}
                item={item}
                facilitiUrl={facilitiUrl}
                facilitiesTitle={facilitiesTitle}
                onRowClick={() => console.log("idx", idx)}
                AccordionTitle={AccordionTitle}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </PublicTableComponent.ListBody>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={pagination ? pagination : null}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </PublicTableComponent.ContainerBody>
    </PublicTableComponent.SContainer>
  );
};
