import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllData } from "../../Actions/Table/table";
import moment from "moment-jalaali";
import { RootState } from "../../Reducers";

// Images
import { TableComponent } from "../../Components/publicTable/Main";
import { ThunkDispatch } from "redux-thunk";
import { setAuthToken } from "Services/httpService";

// Interface for the contract data
interface contract<T> {
  ContractNumber: T;
  SoftwareSerial: T;
  ContractTitle: T;
  ContractStartDate: T;
  ContractEndDate: T;
  ContractStatus: T;
  ContractCheckStatus: T;
  ContractId: T;
}

// Interface for the generic table props
interface GenericTableProps<T> {
  page: string;
  data: Array<Array<string | JSX.Element | T>>;
  title: Array<{ title: string }>;
  loading: boolean;
  contractPage: boolean;
  navigateNewAddress: string;
  buttonTitle: string;
}

// Interface for the title object

interface Title {
  title: string;
}

const MyContract: React.FC = () => {
  // const devices = useSelector((state) => state.devices.items);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [contracts, setContracts] = useState<contract<string>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  // getAllData
  const handleGetMyContractList = async () => {
    const { allData } = await dispatch(getAllData("ContractGetAll", "SET-CONTRACT"));
    setContracts(allData);

    setLoading(false);
  };
  useEffect(() => {
    setLoading(false);
    setAuthToken();
  }, []);
  useEffect(() => {
    handleGetMyContractList();
  }, []);
  //Set Titles
  const titles: Title[] = [
    { title: "شماره قرارداد" },
    { title: "سریال نرم‌افزار" },
    { title: " عنوان قرارداد" },
    { title: "تاریخ شروع" },
    { title: "تاریخ پایان" },
    { title: " وضعیت قرارداد" },
    { title: " وضعیت بررسی" },
  ];
  const dataShow = contracts?.map((contract: contract<string>) => [
    contract.ContractNumber ?? " ",
    contract.SoftwareSerial ?? " ",
    contract.ContractTitle ?? " ",
    moment(contract.ContractStartDate).format("jYYYY-jMM-jDD") ?? " ",
    moment(contract.ContractEndDate).format("jYYYY-jMM-jDD") ?? " ",
    contract.ContractStatus ?? " ",
    contract.ContractCheckStatus ?? "",
    contract.ContractId ?? " ",
  ]);
  const GenericTableProps: GenericTableProps<string> = {
    page: "قرارداد",
    data: userData,
    title: titles,
    loading: loading,
    contractPage: true,
    navigateNewAddress: "/mycontract/software",
    buttonTitle: "قرارداد جدید",
  };

  // Effect hook to update local storage when order data changes
  useEffect(() => {
    if (dataShow && dataShow.length !== 0) {
      localStorage.setItem("ContractTable", JSON.stringify(dataShow)); // Store order data in local storage
      setUserData(dataShow);
    }
    if (dataShow && dataShow.length === 0) {
      setUserData(userData);
    }
  }, [dataShow?.length]);

  // Effect hook to check for changes in order data and fetch new data if needed
  useEffect(() => {
    // Get stored order data from local storage
    const storedUserDataString = localStorage.getItem("ContractTable");

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
      handleGetMyContractList(); // Fetch new order data if there are changes
    }
  }, [dataShow?.length]);

  return (
    <>
      <TableComponent {...GenericTableProps} />
    </>
  );
};
export default MyContract;
