import React from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsersById } from "../Services/services";

function FormContainer({ getData, setShowModal, mockData,isAdd }) {
  const params = useParams();
  console.log("params", params);
  const {
    data: oneUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", params?.id],
    queryFn: () => getUsersById(params?.id),
    enabled: !!params?.id, // شرط فعال بودن
  });
  console.log("oneUser", oneUser);

  return (
    <div>
      <Form getData={getData} oneUser={oneUser} setShowModal={setShowModal} mockData={mockData} isAdd={isAdd}/>
    </div>
  );
}

export default FormContainer;
