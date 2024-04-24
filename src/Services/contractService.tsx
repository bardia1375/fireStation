import serverApi from "./httpService";
import { handleError } from "../Utils/commonFunctions";
import { AxiosResponse } from "axios";

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
// getAllSoftwareSerialService
export const getAllSoftwareSerialService = async (): Promise<AxiosResponse> => {
  try {
    return await serverApi.post("CustomerSoftwareLookup");
  } catch (error) {
    return handleError(error);
  }
};
export const MyPlansSoftServices = async (softwareId, search = "") => {
  try {
    return await serverApi.post(`GetContractPackageBySoftware`, {
      CustomerSoftwareId: softwareId,
    });
  } catch (error) {
    return handleError(error);
  }
};
// export const MyItemsSoftServices = async (ContractPackageId, search = "") => {
//   try {
//     return await serverApi.post(`GetContractPackageItems`, {
//       ContractPackageId: ContractPackageId,
//     });
//   } catch (error) {
//     return handleError(error);
//   }
// };
export const MyOrderPlansSoftServices = async (formData, search = "") => {
  try {
    return await serverApi.post(`ContractPackageBuy`, formData);
  } catch (error) {
    return handleError(error);
  }
};
