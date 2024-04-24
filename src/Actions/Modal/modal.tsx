import { Dispatch } from "redux";

export const openModal = (modalType:string, isOpen:boolean) => async (dispatch:Dispatch) => {
  if (modalType == "newTicket") {
    await dispatch({ type: "SET_NEWMODAL", payload: isOpen });
  }
  if (modalType == "deleteMessage") {
    await dispatch({ type: "SET_DELETEMODAL", payload: isOpen });
  }
};
export const openMenue = (isOpen:boolean) => async (dispatch:Dispatch) => {
  await dispatch({ type: "SET_MENUE", payload: isOpen });
};
