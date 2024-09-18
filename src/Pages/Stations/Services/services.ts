import serverApi from "Services/httpService";

export const getStations = async () => {
  const { data } = await serverApi.get("/UserManagement/getStations");
  return data.data;
};
export const getStatiosById = async id => {
  const { data } = await serverApi.get(`/UserManagement/getStationsById?id=${id}`);
  return data.data;
};
export const editStationData = async item => {
  const { data } = await serverApi.put(`/UserManagement/EditStations`, item);
  return data.data;
};
export const postStationData = async item => {
  const { data } = await serverApi.put(`/UserManagement/CreateStations`, item);
  return data.data;
};
