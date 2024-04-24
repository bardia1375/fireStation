import serverApi from "./httpService";
import { handleError } from "../Utils/commonFunctions";
import { AxiosResponse } from "axios";

// Define the structure of your data
interface Data {
  // Define the structure of a single data item
  // Adjust this according to your actual data structure
  id: number;
  name: string;
  // ...
}

// getAllDataService
export const getAllDataService = async (
  API: string,
  Body: string,
  search: string
): Promise<AxiosResponse<Data[]>> => {
console.log("Body",Body);

  try {
    if (Body?.CustomerSoftwareId) {
      return await serverApi.post(API, {
        CustomerSoftwareId: Body?.CustomerSoftwareId,
      });
    } else if (Body?.Status) {
      return await serverApi.post(API, {
        Status: Body?.Status,
      });
    } else {
      return await serverApi.post(API, {
        Body,
      });
    }
  } catch (error) {
    return handleError(error);
  }
};

// getOneDataService
export const getOneDataService = async (
  API: string,
  QuoteId: number
): Promise<AxiosResponse<Data>> => {
  try {
    return await serverApi.post(API, {
      QuoteId,
    });
  } catch (error) {
    return handleError(error);
  }
};
