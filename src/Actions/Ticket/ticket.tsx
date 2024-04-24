import { Dispatch } from "redux";
import { RootState } from "../../Reducers";
import {
  createNewMessageService,
  deleteMessageByIdService,
  getFileByMessageIdService,
  sendMessageService,
} from "../../Services/ticketService";
import { getAllMyTicketsService, getTicketByIdService } from "../../Services/ticketService";
import { handleErrorResponse } from "../../Utils/commonFunctions";
import { successMessage, errorMessage } from "../../Utils/commonFunctions";
import {
  createNewTicketService,
  getAllSubjectsService,
  getAllSoftwareSerialService,
} from "../../Services/ticketService";

// Action Types
const SET_TICKETS = "SET_TICKETS";
const SET_ISACTIVE = "SET_ISACTIVE";
const SET_MENUE = "SET_MENUE";
const SET_SEARCHTERM = "SET_SEARCHTERM";
const SET_ISSEARCHING_TYPE = "SET_ISSEARCHING_TYPE";

// Action Creators
export const setTickets = (tickets: any[]) => ({
  type: SET_TICKETS,
  payload: tickets,
});

export const setIsActive = (isActive: boolean) => ({
  type: SET_ISACTIVE,
  payload: isActive,
});

export const setMenu = (isOpen: boolean) => ({
  type: SET_MENUE,
  payload: isOpen,
});

export const setSearchTerm = (searchTerm: string) => ({
  type: SET_SEARCHTERM,
  payload: searchTerm,
});

export const setIsSearchingType = (isSearching: boolean) => ({
  type: SET_ISSEARCHING_TYPE,
  payload: isSearching,
});

// Thunk Actions
export const getAllMyTickets =
  (PageNumber, PageSize) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<{ allTickets: any[] }> => {
    try {
      const active = getState().tickets.isActive;
      const searchTerm = getState().tickets.searchTerm;
      const isSearching = getState().tickets.isSearching;
      console.log("1231231231231231231231231231231");

      let response = isSearching
        ? await getAllMyTicketsService(active, PageNumber, PageSize, searchTerm)
        : await getAllMyTicketsService(active, PageNumber, PageSize, "");

      if (response.error) {
        handleErrorResponse(response);
        throw new Error("Error fetching tickets"); // throw an error to indicate failure
      }

      await dispatch(setTickets(response.data.Data));

      localStorage.setItem("TicketsTable", JSON.stringify(response.data.Data)); // Store order data in local storage
      return { allTickets: response?.data?.Data };
    } catch (error) {
      // Log the error or handle it as needed
      console.error(error);
      throw error; // Propagate the error if needed
    }
  };

export const showActiveTickets = (isActive: boolean) => async (dispatch: Dispatch) => {
  await dispatch({ type: SET_ISACTIVE, payload: isActive });
  await dispatch({ type: SET_MENUE, payload: false });
};

export const searchInTickets = (searchterm: string) => async (dispatch: Dispatch) => {
  await dispatch({ type: SET_SEARCHTERM, payload: searchterm });
};

export const setIsSearching = (type: string) => async (dispatch: Dispatch) => {
  if (type === "focus") {
    await dispatch(setIsSearchingType(true));
  } else {
    await dispatch(setIsSearchingType(false));
  }
};

export const getTicketById = async (ticketId: number) => {
  console.log("ticketId", ticketId);

  const response = await getTicketByIdService(ticketId);
  if (response?.error) {
    handleErrorResponse(response);
  } else {
    return { tickets: response.data.Data };
  }
};

export const getFileByMessageId = async (id: number) => {
  const { data } = await getFileByMessageIdService(id);
  let size = 0;
  if (data) {
    size = data.size / 1000000;
  }
  const promise = new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve({ data: reader.result, size: size.toFixed(2) });
    };
    reader.readAsDataURL(data);
  });
  return await promise;
};

export const getVoiceFileByMessageId = async (id: number) => {
  const { data } = await getFileByMessageIdService(id);
  var blobUrl = URL.createObjectURL(data);
  const promise = new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(data);
  });

  return { voice: await promise, data: blobUrl };
};

export const deleteMessageById = async (id: number) => {
  const response = await deleteMessageByIdService(id);

  if (response?.error) {
    handleErrorResponse(response);
  } else {
    successMessage("پیام با موفقیت حذف شد");
  }
};

export const getAllSubjects = async () => {
  const response = await getAllSubjectsService();

  if (response?.error) {
    handleErrorResponse(response);
  } else {
    return { allSubjects: response.data.Data };
  }
};

export const getAllSoftwareSerial = async () => {
  const response = await getAllSoftwareSerialService();

  if (response?.error) {
    handleErrorResponse(response);
  } else {
    return { SoftwareSerialItems: response.data.Data };
  }
};

export const createNewTicket = (ticket: any) => async (dispatch: Dispatch) => {
  const response = await createNewTicketService(ticket);
  console.log("responseresponse234", response);

  if (response.data.ActionCode == -1) {
    handleErrorResponse(response);
    errorMessage(response.data.Message);
    return { status: false };
  } else {
    const all = await dispatch(getAllMyTickets());
    successMessage("تیکت با موفقیت ثبت شد");
    return {
      status: true,
      id: response.data.Data.Id,
      all,
    };
  }
};

export const createNewMessage = async (message: any) => {
  const response = await createNewMessageService(message);
  if (response?.error) {
    handleErrorResponse(response);
  } else {
    // Additional logic if needed
  }
};

export const sendMessage = async (file: any, onProgress: any) => {
  const response = await sendMessageService(file, onProgress);
  if (response?.error) {
    handleErrorResponse(response);
  } else {
    // Additional logic if needed
  }
};
