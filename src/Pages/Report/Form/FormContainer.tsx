import React from "react";
import Form from "./Form";

type Props = {
  getData: (data: unknown) => void; // Define data as 'unknown' for stricter typing, or replace 'unknown' with a specific type if available
  setLoading: (isLoading: boolean) => void; // Set loading expects a boolean parameter
};

export default function FormContainer({ getData, setLoading }: Props) {
  return <Form getData={getData} setLoading={setLoading} />;
}
