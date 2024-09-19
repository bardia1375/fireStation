import Modal from "Components/Modal/Modal";
import { useEffect, useState } from "react";
import Personnel from "./Personnel";
import FormContainer from "./Form/FormContainer";
import { useParams } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUsers } from "./Services/services";



const PersonnelContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  console.log("params", params);

  // استفاده از React Query برای دریافت داده‌ها
  const { data: apiData, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
 console.log(apiData);
 
  // Mock data state
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    if (apiData && !isLoading) {
      // افزودن یک عنصر جدید به mockData پس از دریافت داده‌ها
      const updatedMockData = [
        { id: 999, firstName: "اضافه کردن", lastName: "", imgUrl: "" },
        ...apiData,
      ];
      setMockData(updatedMockData);
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

      <Modal width="80vw" showModal={showModal} closeModal={closeModal} title="Edit User" Submit={Submit}>
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
