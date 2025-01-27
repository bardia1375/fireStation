import React from "react";
import Logs from "./Logs";
import { useQuery } from "@tanstack/react-query";
import { GetPings } from "./Services/Services";
import { useIsEndpointNavbar } from "Utils/permissionUtils";

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
        stationId: "",
        page: 1,
        limit: 12,
      }),
  });
  const endpoint = "/SystemLogs/GetLogs";
  const hasPermission = useIsEndpointNavbar(endpoint);

  return hasPermission && <Logs Logsdata={Logsdata?.data} />;
}

export default LogsContainer;
