import { useEffect } from "react";
import { useSelector } from "react-redux";

const useLocalStorageEffect = (
  Url: string,
  dataShow: any,
  userData: any,
  setUserData: React.Dispatch<any>, // Pass setUserData as a parameter
  handleGet: () => void
) => {
  const AccountId = localStorage.getItem("AccountId");

  useEffect(() => {
    if (dataShow && dataShow.length !== 0) {
      localStorage.setItem(`${Url}`, JSON.stringify(dataShow));
      setUserData(dataShow);
    }
    if (dataShow && dataShow.length === 0) {
      setUserData(userData);
    }
  }, [dataShow?.length]); // Include userData and setUserData in dependencies array

  useEffect(() => {
    const storedUserDataString = localStorage.getItem(`${Url}${AccountId}`);
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : [];

    setUserData(storedUserData);

    if (
      userData &&
      dataShow &&
      dataShow.length !== 0 &&
      dataShow?.sort().join(",") !== userData?.sort().join(",")
    ) {
      handleGet();
    }
  }, [dataShow?.length]); // Include userData, setUserData, and handleGetMyContractList in dependencies array
};

export default useLocalStorageEffect;
