import serverApi from "Services/httpService";

// سرویس برای ارسال درخواست POST به /Missions/MissionReport
export const sendMissionReport = async ({ fromDate, toDate, stationId }) => {
  const payload = {
    page: 1,
    limit: 15,
    fromDate,
    toDate,
    stationId,
  };

  // ارسال درخواست POST
  const { data } = await serverApi.post(`/Missions/MissionReport`, payload);
  return data; // بازگرداندن داده‌های دریافت شده
};
