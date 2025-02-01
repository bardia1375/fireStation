import serverApi from "Services/httpService";

// سرویس برای ارسال درخواست POST به /Reports/MissionReport
export const sendMissionReport = async ({ fromDate, toDate, stationId }) => {
  const payload = {
    page: 1,
    limit: 15,
    fromDate,
    toDate,
    stationId,
  };

  // ارسال درخواست POST
  const { data } = await serverApi.post(`/Reports/MissionReport`, payload);
  return data; // بازگرداندن داده‌های دریافت شده
};

export const getReports = async (fromDate, toDate) => {
  const payload = {
    page: 1,
    limit: 1000,
    fromDate: fromDate,
    toDate: toDate,
    // stationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };
  const { data } = await serverApi.post(`/Reports/MissionReport`, payload);
  return data;
};
