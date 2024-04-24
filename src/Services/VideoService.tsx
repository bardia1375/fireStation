import serverApi from "./httpService";
import { handleError } from "./../Utils/commonFunctions";
import { AxiosResponse } from "axios";

// getVideoGroups
export const getVideoGroupsService = async (): Promise<AxiosResponse> => {
  try {
    return await serverApi.get("VideoGroups");
  } catch (error) {
    return handleError(error);
  }
};

// getVideos
export const getVideosService = async (ID: string): Promise<AxiosResponse> => {
  try {
    return await serverApi.get(`Videos/${ID}`);
  } catch (error) {
    return handleError(error);
  }
};
