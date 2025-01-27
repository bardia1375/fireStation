import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { ConfigureButton } from "../../assets/styles/layout/Calendar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface DateRangePickerProps {
  getData: (data: any) => void;
  isLoading?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ getData, isLoading }) => {
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);

  useEffect(() => {
    if (fromDate) {
      localStorage.setItem("fromDate", moment(fromDate?.toDate()).format("YYYY-MM-DD"));
    }
    if (toDate) {
      localStorage.setItem("toDate", moment(toDate?.toDate()).format("YYYY-MM-DD"));
    }
  }, [fromDate, toDate]);

  const submitDates = () => {
    if (fromDate && toDate && fromDate.toDate() > toDate.toDate()) {
      alert("ازتاریخ نباید بزرگتر از تاتاریخ باشد");
      return;
    }

    const now = new Date(); // Current time
    const fromGregorianDate = fromDate
      ? moment(fromDate.toDate()).format("YYYY-MM-DD")
      : moment(now).format("YYYY-MM-DD");
    const fromGregorianTime = fromDate
      ? moment(fromDate.toDate()).format("HH:mm")
      : moment(now).format("HH:mm");

    const toGregorianDate = toDate
      ? moment(toDate.toDate()).format("YYYY-MM-DD")
      : moment(now).format("YYYY-MM-DD");
    const toGregorianTime = toDate
      ? moment(toDate.toDate()).format("HH:mm")
      : moment(now).format("HH:mm");
    console.log("fromGregorianTime", {
      fromDate: fromGregorianDate,
      fromTime: fromGregorianTime,
      toDate: toGregorianDate,
      toTime: toGregorianTime,
    });

    getData({
      fromDate: fromGregorianDate,
      fromTime: fromGregorianTime,
      toDate: toGregorianDate,
      toTime: toGregorianTime,
    });
  };

  return (
    <>
      <DatePicker
        value={fromDate}
        onChange={setFromDate}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD HH:mm" // No seconds
        plugins={[<TimePicker position="bottom" hideSeconds />]} // Disable seconds
        placeholder="انتخاب تاریخ و ساعت شروع"
        style={{
          width: "150px",
          padding: "12px",
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
        format="YYYY/MM/DD HH:mm" // No seconds
        plugins={[<TimePicker position="bottom" hideSeconds />]} // Disable seconds
        placeholder="انتخاب تاریخ و ساعت پایان"
        minDate={fromDate?.toDate()} // Disable dates before the selected "fromDate"
        style={{
          width: "150px",
          padding: "12px",
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
      >
        {isLoading ? "در حال ارسال..." : "ثبت"}
      </ConfigureButton>
    </>
  );
};

export default DateRangePicker;
