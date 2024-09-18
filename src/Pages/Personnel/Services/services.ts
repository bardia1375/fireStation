import serverApi from "Services/httpService";

export const getUsers = async () => {
  const { data } = await serverApi.get("/UserManagement/GetUsers");
  return data.data;
};
export const getUsersById = async id => {
  const { data } = await serverApi.get(`/UserManagement/GetUserById?id=${id}`);
  return data.data;
};
export const editUserData = async () => {
  const { data } = await serverApi.put(`/UserManagement/EditUser`);
  return data.data;
};
export const postUserData = async items => {
  const { data } = await serverApi.put(`/UserManagement/CreateUser`, items);
  return data.data;
};
