import React from "react";
import Logs from "./Logs";
import { useQuery } from "@tanstack/react-query";
import { GetPings } from "./Services/Services";

type Props = {};

function LogsContainer({}: Props) {
  const {
    data: Logsdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ping"],
    queryFn: () =>
      GetPings({
        stationId: "beeb67b9-13c7-4595-f8a8-08dcdada309e",
        page: 1,
        limit: 12,
      }),
  });
  return <Logs Logsdata={Logsdata?.data} />;
}

export default LogsContainer;
