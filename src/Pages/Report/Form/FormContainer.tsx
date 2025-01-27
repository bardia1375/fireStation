import React, { useState } from "react";
import Form from "./Form";

type Props = {
  getData: (data: unknown) => void; // Define data as 'unknown' for stricter typing, or replace 'unknown' with a specific type if available
  setLoading: (isLoading: boolean) => void; // Set loading expects a boolean parameter
};

export default function FormContainer({ getData, setLoading, isLoading }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>تنظیمات</button> */}
      {true && <Form getData={getData} setLoading={setLoading} isLoading={isLoading} />}
    </>
  );
}
