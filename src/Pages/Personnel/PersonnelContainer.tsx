import Modal from "Components/Modal/Modal";
import { useEffect, useState } from "react";
import Personnel from "./Personnel";
import FormContainer from "./Form/FormContainer";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./Services/services";
import {
  isAdmin,
  useIsEndpointCrud,
  useIsEndpointNavbar,
  
} from "Utils/permissionUtils";
import Permissions from "./Form/Permissions/Permissions";

const PersonnelContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const history = useHistory();
  const endpoint = "/UserManagement/GetUsers"; // فرضی، اندپوینت جاری که می‌خواهید چک کنید
  // const [hasPermission, setHasPermission] = useState<boolean>(false);
  const hasPermission = useIsEndpointNavbar(endpoint);
  // استفاده از React Query برای دریافت داده‌ها
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: hasPermission, // only fetch if permission is true
  });

  // Mock data state
  const [mockData, setMockData] = useState([]);
  const endpointCreate = "/UserManagement/CreateUser";
  const hasPermissionCreate = useIsEndpointCrud(endpointCreate);
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (apiData && !isLoading) {
      if (hasPermissionCreate) {
        const updatedMockData = [
          { id: 999, firstName: "اضافه کردن", lastName: "", imgUrl: "" },
          ...apiData,
        ];
        setMockData(updatedMockData);
      } else {
        setMockData(apiData);
      }
    }
  }, [apiData, isLoading]);

  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getData = data => {
    setUserData(data);
  };

  const Submit = data => {
    console.log("userData", userData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <SContainer style={{ width: "100%" }}>
      <div className="personnel-grid">
        {mockData.map((person, index) => (
          <Personnel
            key={person.id}
            isActive={person.isActive}
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            imgUrl={person.imgUrl}
            onEdit={() => handleEdit(person)}
            dataLength={index === 0}
            setShowModal={setShowModal}
          />
        ))}
      </div>

    <Modal width="80vw" showModal={showModal} closeModal={closeModal} Submit={Submit}>
      <FormContainer getData={getData} setShowModal={setShowModal} mockData={mockData} />
    </Modal>
  </SContainer>
  );
};

export default PersonnelContainer;

export const SContainer = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  overflow: auto;
`;
