import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Report from "./Report";
import { useAppContext } from "Context/AppContext";
import { sendMissionReport } from "./services/services";

function ReportContainer({ getData, setShowModal, mockData, deviceState }) {
  const { fromDate, toDate } = useAppContext();

  console.log("From Date:", fromDate, "To Date:", toDate);

  const mutation = useMutation({
    mutationFn: () => sendMissionReport({ fromDate, toDate }),
    onSuccess: data => {
      console.log("Mission report data:", data);
    },
    onError: error => {
      console.error("Error sending mission report:", error); 
    },
  });

  return (
    <div>
      <button onClick={() => mutation.mutate()}>ارسال گزارش</button>{" "}
      <Report
        getData={getData}
        oneStationSetting={mutation.data} 
        setShowModal={setShowModal}
        mockData={mockData}
        deviceState={deviceState}
      />
    </div>
  );
}

export default ReportContainer;
