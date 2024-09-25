import React from "react";
import Form from "./Form";

type Props = {
  getData: (data: any) => void;
  setLoading: boolean;
};

export default function FormContainer({ getData, setLoading }: Props) {
  return <Form getData={getData} setLoading={setLoading} />;
}
