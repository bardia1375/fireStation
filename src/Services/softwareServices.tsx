import serverApi from "./httpService";
import { handleError } from "../Utils/commonFunctions";

export const CustomerSoftwareFeaturesBuy = async body => {
  try {
    return await serverApi.post(`CustomerSoftwareFeaturesBuy`, body);
  } catch (error) {
    return handleError(error);
  }
};

// import serverApi from "./httpService";
// import { handleError } from "../Utils/commonFunctions";

// export const CustomerSoftwareFeaturesBuy = async body => {
//   try {
//     return await serverApi.post(`CustomerSoftwareFeaturesBuy`, [
//       {
//         softwareId: "3bc9aee6-aa57-ee11-a027-000c29580b63",
//       },
//       {
//         softwareId: "0c08ec17-ab57-ee11-a027-000c29580b63",
//       },
//       {
//         softwareId: "100fce66-ab57-ee11-a027-000c29580b63",
//       },
//     ]);
//   } catch (error) {
//     return handleError(error);
//   }
// };
