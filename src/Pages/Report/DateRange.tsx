import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { ConfigureButton } from "../../assets/styles/layout/Calendar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Tanstack Query
import serverApi from "Services/httpService";
import { errorMessage, successMessage } from "../../Utils/commonFunctions";

interface DateRangePickerProps {
  getData: (data: any) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ getData }) => {
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.setItem("fromDate", moment(fromDate?.toDate()).format("YYYY-MM-DD"));
    localStorage.setItem("toDate", moment(toDate?.toDate()).format("YYYY-MM-DD"));
  }, [fromDate, toDate]);

  // Mutation for the date submission
  const { mutate, isLoading } = useMutation({
    mutationFn: async (dates: { fromDate: string | null; toDate: string | null }) => {
      const response = await serverApi.post("/Missions/MissionReport", {
        ...dates,
        limit: 1000,
        page: 1,
      });
      return response.data.data.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });

      getData(data);
      successMessage("گزارش گیری انجام شد");
    },
    onError: error => {
      console.error("Submission error:", error);
      errorMessage("خطایی رخ داده است");
    },
  });

  const submitDates = () => {
    if (fromDate && toDate && fromDate.toDate() > toDate.toDate()) {
      errorMessage("ازتاریخ نباید بزرگتر از تاتاریخ باشد");
      return;
    }

    const fromGregorianDate = fromDate ? moment(fromDate.toDate()).format("YYYY-MM-DD") : null;
    const toGregorianDate = toDate ? moment(toDate.toDate()).format("YYYY-MM-DD") : null;

    mutate({ fromDate: fromGregorianDate, toDate: toGregorianDate });
  };

  return (
    <>
      <DatePicker
        value={fromDate}
        onChange={setFromDate}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        placeholder="از تاریخ"
        style={{
          width: "150px",
          padding: "16px",
          fontSize: "14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          color: "#333",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "border-color 0.2s ease-in-out",
        }}
        onFocus={e => (e.target.style.borderColor = "#007bff")}
        onBlur={e => (e.target.style.borderColor = "#ccc")}
      />

      <DatePicker
        value={toDate}
        onChange={setToDate}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        placeholder="تا تاریخ"
        style={{
          width: "150px",
          padding: "16px",
          fontSize: "14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          color: "#333",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "border-color 0.2s ease-in-out",
        }}
        onFocus={e => (e.target.style.borderColor = "#007bff")}
        onBlur={e => (e.target.style.borderColor = "#ccc")}
      />

      <ConfigureButton
        onClick={submitDates}
        style={{ border: "none", padding: 0, height: "30px", width: "100px", margin: 10 }}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "در حال ارسال..." : "ثبت"}
      </ConfigureButton>
    </>
  );
};

export default DateRangePicker;
