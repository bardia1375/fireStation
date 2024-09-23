import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { ConfigureButton } from "../../assets/styles/layout/Calendar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import serverApi from "Services/httpService";
import { errorMessage } from "../../Utils/commonFunctions";

interface DateRangePickerProps {
  getData: (data: any) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ getData }) => {
  // مدیریت "از تاریخ" و "تا تاریخ"
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // برای نمایش پیام خطا

  // تابع ارسال به بک‌اند
  const submitDates = async () => {
    // بررسی اینکه آیا تاریخ "از تاریخ" بزرگتر از تاریخ "تا تاریخ" است
    if (fromDate && toDate && fromDate.toDate() > toDate.toDate()) {
      errorMessage("ازتاریخ نباید بزرگتر از تاتاریخ باشد");
      return;
    }

    try {
      // بررسی اینکه آیا تاریخ معتبر است
      const fromGregorianDate = fromDate ? moment(fromDate.toDate()).format("YYYY-MM-DD") : null;
      const toGregorianDate = toDate ? moment(toDate.toDate()).format("YYYY-MM-DD") : null;
      const newDate = {
        fromDate: fromGregorianDate,
        toDate: toGregorianDate,
        limit: 1000,
        page: 1,
      };
      serverApi
        .post("/Missions/MissionReport", newDate)
        .then(response => {
          getData(response.data.data.data);
          console.log("Submission successful:", response.data.data.data);
        })
        .catch(error => {
          console.error("Submission error:", error);
        });
    } catch (error) {
      console.error("Error sending dates:", error);
    }
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
        onClick={submitDates} // ثبت تاریخ‌ها
        style={{ border: "none", padding: 0, height: "30px", width: "100px", margin: 10 }}
      >
        ثبت
      </ConfigureButton>
    </>
  );
};

export default DateRangePicker;
