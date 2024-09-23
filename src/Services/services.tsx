import serverApi from "./httpService";

export const getSettingData = async () => {
  const { data } = await serverApi.get(`/BaseSettings/GetBaseSetting`);
  return data.data;
};
