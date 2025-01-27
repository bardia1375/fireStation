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
  const { data } = await serverApi.post(`/BaseSettings/Upsert`, item);
  return data.data;
};
export const editSettingRele = async item => {
  const { data } = await serverApi.post(`/DeviceRelays/Upsert`, item);
  return data.data;
};
export const getSettingData = async () => {
  const { data } = await serverApi.get(`/BaseSettings/GetBaseSetting`);
  return data.data;
};
export const getSettingRele = async () => {
  const { data } = await serverApi.get(`/DeviceRelays/GetDeviceRelay
`);
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
export const StartGroupMission = async item => {
  const { data } = await serverApi.put(`/Missions/GroupStartMission`, item);
  return data.data;
};
export const GetMissionSettings = async stationId => {
  const { data } = await serverApi.get(`/Stations`);
  return data.data;
};
