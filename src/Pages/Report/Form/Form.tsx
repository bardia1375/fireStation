import React from "react";
import DateRangePicker from "../DateRange";

type Props = {
  getData: (data: any) => void;
  setLoading: (isLoading: boolean) => void; // Set loading expects a boolean parameter
};
export default function Form({ getData, setLoading }: Props) {
  return <DateRangePicker getData={getData} setLoading={setLoading} />;
}
