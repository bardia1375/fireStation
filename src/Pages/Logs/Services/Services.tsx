import serverApi from "Services/httpService";

export const GetPings = async item => {
  console.log("item", item);

  const { data } = await serverApi.post(`/SystemLogs/GetLogs`, item);

  return data.data;
};
