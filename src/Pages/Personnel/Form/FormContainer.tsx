import React from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";

function FormContainer({ getData, setShowModal, mockData }) {
  const params = useParams();
  console.log("params", params);
  return (
    <div>
      <Form getData={getData} setShowModal={setShowModal} mockData={mockData} />
    </div>
  );
}

export default FormContainer;
