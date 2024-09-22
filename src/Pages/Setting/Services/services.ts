import axios from "axios";
import serverApi from "Services/httpService";

export const getStations = async () => {
  const { data } = await serverApi.get("/UserManagement/getStations");
  return data.data;
};
export const getStatiosById = async id => {
  const { data } = await serverApi.get(`/UserManagement/getStationsById?id=${id}`);
  return data.data;
};
export const editSettingData = async item => {
  const { data } = await serverApi.post(`/MissionTimeQualities/Upsert`, item);
  return data.data;
};
export const getSettingData = async () => {
  const { data } = await serverApi.get(`/MissionTimeQualities/GetQualityTime`);
  return data.data;
};
export const postStationData = async item => {
  const { data } = await serverApi.put(`/UserManagement/CreateStations`, item);
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
