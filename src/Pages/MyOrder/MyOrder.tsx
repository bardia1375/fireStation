import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllData, getId } from "../../Actions/Table/table";
import { TableComponent } from "../../Components/publicTable/Main";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducers";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "../../Components/Commons";
import moment from "moment-jalaali";
import { ThunkDispatch } from "redux-thunk";
import { getOneDataService } from "Services/DevicesServices";
import { numberWithCommasAndPersian } from "../../Components/Commons/NumberToPersian";
import { setAuthToken } from "Services/httpService";

interface GenericTableProps<T> {
  page: string;
  data: Array<Array<string | JSX.Element | T>>;
  title: Array<{ title: string }>;
  loading: boolean;
  setItem: React.Dispatch<React.SetStateAction<T[]>>;
  item: T[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  funcOrderId: (id: number) => void;
  TableData: T[];
  checkBox: boolean;
  preOrder: boolean;
  onRowClick: (item: []) => void; // Update the type of onRowClick
  accordion: boolean;
}

interface OrderItem {
  Id: number;
  QuoteNumber: string;
  QuoteDate: string;
  QuoteTotal: string;
  QuoteStatus: string;
  QuoteId: string;
  QuoteDiscount: string;
  QuoteTax: string;
}

const MyOrder: React.FC<{ funcOrderId: (id: number) => void }> = ({ funcOrderId }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<OrderItem[]>([]);
  const [userData, setUserData] = useState<any>(null);

  // Function to fetch list of orders
  const handleGetMyOrdersList = async () => {
    const { allData }: { allData: OrderItem[] } = await dispatch(
      getAllData("QuoteGetAll", "SET-ORDER", { Status: "" })
    ); // Fetch orders data
    if (allData) {
      setOrder(allData); // Set order data if available
    }
    setLoading(false);
  };

  // Effect hook to run once on component mount
  useEffect(() => {
    setLoading(false);
    setAuthToken(); // Set authentication token
  }, []);

  // Effect hook to fetch orders data when refresh state changes
  useEffect(() => {
    handleGetMyOrdersList(); // Fetch orders data
  }, [refresh]);

  // Function to handle row click event
  const onRowClick = (item: OrderItem[]) => {
    // Handle row click event
  };

  // Redux selector to get selected items
  const { selectedItems } = useSelector((state: RootState) => state.tableData);

  // Titles for the table
  const titles = [
    { title: "شماره سفارش" },
    { title: "تاریخ سفارش" },
    { title: " مجموع " },
    { title: " وضعیت " },
  ];

  // Accordion titles for order details
  const AccordionTitle = order?.map((item: OrderItem) => [
    { title: "اقتصادی", value: `${numberWithCommasAndPersian(item.QuoteDiscount)} ریال` },
    { title: "تخفیف", value: `${numberWithCommasAndPersian(item.QuoteDiscount)} ریال` },
    { title: "مجموع", value: `${numberWithCommasAndPersian(item.QuoteTotal)} ریال` },
    { title: "مالیات", value: `${numberWithCommasAndPersian(item.QuoteTax)} ریال` },
  ]);

  // Format order data for display
  const dataShow = order?.map((item: OrderItem) => [
    item.QuoteNumber ?? " ",
    moment(item.QuoteDate).format("jYYYY-jMM-jDD"),
    numberWithCommasAndPersian(item.QuoteTotal) ?? numberWithCommasAndPersian(item.QuoteTotal),
    item.QuoteStatus ?? item.QuoteStatus,
    item.QuoteId ?? item.QuoteId,
  ]);

  // Effect hook to update local storage when order data changes
  useEffect(() => {
    if (dataShow && dataShow.length !== 0) {
      localStorage.setItem("OrderTable", JSON.stringify(dataShow)); // Store order data in local storage
      setUserData(dataShow);
    }
    if (dataShow && dataShow.length === 0) {
      setUserData(userData);
    }
  }, [dataShow?.length]);

  // Effect hook to check for changes in order data and fetch new data if needed
  useEffect(() => {
    // Get stored order data from local storage
    const storedUserDataString = localStorage.getItem("OrderTable");

    // Parse stored order data if it exists, or set to an empty array if null
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : [];

    // Update user data state with stored data
    setUserData(storedUserData);

    // Check if there is user data, dataShow has a length, and they are different
    if (
      userData &&
      dataShow &&
      dataShow.length !== 0 &&
      dataShow?.sort().join(",") !== userData?.sort().join(",")
    ) {
      handleGetMyOrdersList(); // Fetch new order data if there are changes
    }
  }, [dataShow?.length]);

  // Props for TableComponent
  const genericTableProps: GenericTableProps<OrderItem> = {
    page: "سفارش",
    data: userData || [],
    TableData: order || [],
    title: titles,
    loading: loading,
    setItem: setItem,
    item: item,
    refresh: refresh,
    setRefresh: setRefresh,
    funcOrderId: funcOrderId,
    checkBox: true,
    preOrder: true,
    onRowClick: onRowClick,
    accordion: true,
  };

  funcOrderId(order?.length > 0 ? order[0]?.Id : 0);
  return (
    <>
      <TableComponent {...genericTableProps} AccordionTitle={AccordionTitle} />
      <BottomTable>
        <div>
          در صورت تمایل برای خرید حقوقی، لطفا در قسمت اطلاعات شخصی، اطلاعات حقوقی خود را وارد کنید
        </div>
        <div className="price">
          <Typography>
            <Typography color={"secondary"}>
              تعداد سفارش های انتخاب شده: {selectedItems?.length}
            </Typography>

            {/* <Typography color={"secondary"}> مجموع سفارش ها :</Typography> */}
            {/* <Typography>{order?.length > 0 ? order[0].QuoteTotal : 0} ریال </Typography> */}
          </Typography>
          <div>
            <Link
              to={selectedItems?.length > 0 ? "/myorder/payment" : "/myorder"}
              className={
                selectedItems?.length > 0
                  ? "mycontractsoft_link-route"
                  : "mycontractsoft_link-route-dis"
              }
            >
              <h3>انتخاب نوع پرداخت</h3>
            </Link>
          </div>
        </div>
      </BottomTable>
    </>
  );
};

export default MyOrder;

export const BottomTable = styled.div`
  position: relative;
  width: 100%;
  background: #fff;

  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 0 0 24px 24px;
  padding: 32px 24px;
  margin-top: -33px;
  .price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
`;
