import React from "react";
import DateRangePicker from "../DateRange";

type Props = {
  getData: (data: any) => void;
  setLoading: boolean;
};
export default function Form({ getData, setLoading }: Props) {
  return <DateRangePicker getData={getData} setLoading={setLoading} />;
}
