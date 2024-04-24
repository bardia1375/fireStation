import serverApi from "../../Services/httpService";
import { handleError } from "../../Utils/commonFunctions";

// getContractSoftware

export const MyContractSoftServices = async (search = "") => {
  try {
    return await serverApi.post(`CustomerSoftwareGetAll`);
  } catch (error) {
    return handleError(error);
  }
};
export const MyContractOneSoftServices = async (search = "") => {
  try {
    return await serverApi.post(`CustomerSoftwareGet`);
  } catch (error) {
    return handleError(error);
  }
};
export const MyPlansSoftServices = async (softwareId,search = "") => {
  try {
    return await serverApi.get(`Plans?SoftwareId=${softwareId}`, {
      params: {
        search,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
export const MyOrderPlansSoftServices = async (formData,search = "") => {
  try {
    return await serverApi.post(`Order`,formData);
  } catch (error) {
    return handleError(error);
  }
};
