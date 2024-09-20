import React from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStatiosById } from "../Services/services";

function FormContainer({ getData, setShowModal, mockData,deviceState }) {
  const params = useParams();
  console.log("params", params);
  const {
    data: oneUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", params?.id],
    queryFn: () => getStatiosById(params?.id),
    enabled: !!params?.id, // شرط فعال بودن
  });
  console.log("oneUser", oneUser);

  return (
    <div>
      <Form getData={getData} oneUser={oneUser} setShowModal={setShowModal} mockData={mockData} deviceState={deviceState} />
    </div>
  );
}

export default FormContainer;
