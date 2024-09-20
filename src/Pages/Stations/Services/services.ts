import axios from "axios";
import serverApi from "Services/httpService";

export const getStations = async () => {
  const { data } = await serverApi.get("/UserManagement/getStations");
  return data.data;
};
export const getStatiosById = async (id) => {
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
  const { data } = await serverApi.put(`/Missions/StartMissyhion`, item);
  return data.data;
};
export const GetMissionSettings = async stationId => {
  const { data } = await axios.get(`http://192.168.20.33:2224/Stations`);
  return data.data;
};
