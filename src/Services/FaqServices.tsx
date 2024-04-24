import serverApi from "./httpService";
import { handleError } from "../Utils/commonFunctions";
import { AxiosResponse } from "axios";

// Define the structure of your FAQ groups and questions
interface FaqGroup {
  // Define the structure of a single FAQ group
  // Adjust this according to your actual data structure
  id: number;
  name: string;
  // ...
}

interface Question {
  // Define the structure of a single question
  // Adjust this according to your actual data structure
  id: number;
  text: string;
  // ...
}

// getFaqGroupsService
export const getFaqGroupsService = async (): Promise<AxiosResponse<FaqGroup[]>> => {
  try {
    return await serverApi.get("FaqGroups");
  } catch (error) {
    return handleError(error);
  }
};

// getQuestionsService
export const getQuestionsService = async (ID: number): Promise<AxiosResponse<Question[]>> => {
  try {
    return await serverApi.get(`Faq/${ID}`);
  } catch (error) {
    return handleError(error);
  }
};
