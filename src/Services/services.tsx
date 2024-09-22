import serverApi from "./httpService";

export const getSettingData = async () => {
    const { data } = await serverApi.get(`/MissionTimeQualities/GetQualityTime`);
    return data.data;
  };