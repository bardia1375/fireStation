import axios from "axios";
import serverApi from "Services/httpService";

export const getStations = async () => {
  const { data } = await serverApi.get("/UserManagement/getStations");
  return data.data;
};
export const getStatiosById = async id => {
  // ارسال stationId به عنوان query parameter
  const { data } = await serverApi.get(`/Stations/GetStationSettings`, {
    params: {
      stationId: id,
    },
  });

  return data.data; // برگرداندن داده‌های دریافتی
};

export const editStationData = async item => {
  const { data } = await serverApi.put(`/Stations/EditStation`, item);
  return data.data;
};
export const postStationData = async item => {
  const { data } = await serverApi.post(`/Stations/CreateStation`, item);
  return data.data;
};
export const StartMission = async item => {
  const { data } = await serverApi.put(`/Missions/StartMission`, item);
  return data.data;
};
export const GetMissionSettings = async stationId => {
  const { data } = await serverApi.get(`/Stations`);
  return data.data;
};
export const GetPings = async item => {
  console.log("item", item);

  const { data } = await serverApi.post(`/DeviceLogs/GetLogs`,  item );

  return data.data;
};
