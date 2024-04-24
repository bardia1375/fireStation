import serverApi from "./httpService";
import { handleError } from "../Utils/commonFunctions";
import { AxiosResponse } from "axios";

// getAllSubjects
export const getAllSubjectsService = async (): Promise<AxiosResponse> => {
  try {
    return await serverApi.get("ticket/subjects");
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

// getAllMyTicketsService
export const getAllMyTicketsService = async (
  active: any,
  PageNumber,
  PageSize,
  searchTerm
): Promise<AxiosResponse> => {
  console.log("activeactive", active);
  
  try {
    return await serverApi.post(`ticketgetall`, {
      Status: active == 1 ? "Open" : "",
      PageNumber: PageNumber,
      PageSize: PageSize,
      searchTerm: searchTerm,
    });
  } catch (error) {
    return handleError(error);
  }
};

// getTicketByIdService
export const getTicketByIdService = async (TicketId: string): Promise<AxiosResponse> => {
  try {
    return await serverApi.post(`TicketGet`, { TicketId });
  } catch (error) {
    return handleError(error);
  }
};

// createNewTicketService
export const createNewTicketService = async (ticket: any): Promise<AxiosResponse> => {
  try {
    return await serverApi.post("TicketCreate", ticket);
  } catch (error) {
    return handleError(error);
  }
};

// createNewMessageService
export const createNewMessageService = async (message: string): Promise<AxiosResponse> => {
  try {
    return await serverApi.post("ticket/addmessage", message);
  } catch (error) {
    return handleError(error);
  }
};

// getFileByMessageIdService
export const getFileByMessageIdService = async (
  MessageId: string
): Promise<AxiosResponse<Blob>> => {
  try {
    return await serverApi.get(`ticket/downloadfile/${MessageId}`, {
      responseType: "blob",
    });
  } catch (error) {
    return handleError(error);
  }
};

// deleteMessageByIdService
export const deleteMessageByIdService = async (MessageId: string): Promise<AxiosResponse> => {
  try {
    return await serverApi.post(`ticket/deletemessage`, MessageId);
  } catch (error) {
    return handleError(error);
  }
};

// sendMessageService
export const sendMessageService = async (file: any, onProgress: any): Promise<AxiosResponse> => {
  try {
    return await serverApi.post(
      "TicketMessageCreate",
      {
        TicketId: file?.TicketId,
        FileContent: file?.FileContent,
        Message: file?.Message,
        MimeType: file?.MimeType,
        FileName: file?.FileName,
      },
      {
        onUploadProgress: onProgress,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};
