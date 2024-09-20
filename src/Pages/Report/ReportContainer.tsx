import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Report from "./Report";
import { DateContext } from "../Context/DateContext"; // فرض بر این است که از کانتکست تاریخ استفاده می‌شود
import { useAppContext } from "Context/AppContext";
import { sendMissionReport } from "./services/services";

function ReportContainer({ getData, setShowModal, mockData, deviceState }) {
  const { fromDate, toDate } = useAppContext() // دریافت fromDate و toDate از کانتکست

  console.log("From Date:", fromDate, "To Date:", toDate); // بررسی تاریخ‌ها در console

  // استفاده از useMutation برای ارسال گزارش ماموریت
  const mutation = useMutation({
    mutationFn: () => sendMissionReport({ fromDate, toDate }), // ارسال داده‌ها به تابع سرویس
    onSuccess: (data) => {
      console.log("Mission report data:", data); // نمایش داده‌های دریافتی در console
      // اینجا می‌توانید داده‌های دریافت شده را به فرم یا کامپوننت دیگری ارسال کنید
    },
    onError: (error) => {
      console.error("Error sending mission report:", error); // در صورت بروز خطا
    },
  });

  return (
    <div>
      <button onClick={() => mutation.mutate()}>ارسال گزارش</button> {/* دکمه‌ای برای ارسال درخواست */}
      <Report
        getData={getData}
        oneStationSetting={mutation.data} // داده‌های دریافتی از گزارش را به Report ارسال کنید
        setShowModal={setShowModal}
        mockData={mockData}
        deviceState={deviceState}
      />
    </div>
  );
}

export default ReportContainer;
