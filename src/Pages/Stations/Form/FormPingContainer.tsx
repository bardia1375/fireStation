import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetPings } from "../Services/services";
import { useParams } from "react-router-dom";
import "./FormPingContainer.css"; // فایل CSS برای استایل‌دهی

function FormPingContainer(deviceState) {
  const { id } = useParams();

  // دریافت داده‌ها از API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ping"],
    queryFn: () =>
      GetPings({
        stationId: id,
        page: 1,
        limit: 20,
      }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || data.length === 0) {
    return <div>Error fetching data or no data available.</div>;
  }

  return (
    <div className="ping-container">
      <h2 style={{ display: "flex" }}>
        <i style={{ color: "#0089a7", fontSize: "1em"}}>لاگ ها</i>
      </h2>
      {data.data.map((ping, index) => (
        <div key={index} className="ping-card">
          <p className="ping-card__text">
            ایستگاه <b>{ping.stationName}</b> در تاریخ و ساعت <b>{ping.shamsiDatetime}</b>{" "}
            {ping.type} یافته است.
          </p>
        </div>
      ))}
    </div>
  );
}

export default FormPingContainer;
