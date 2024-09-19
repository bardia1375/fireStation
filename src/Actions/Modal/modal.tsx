import { Dispatch } from "redux";

export const openModal = ( isOpen:boolean) => async (dispatch:Dispatch) => {
  await dispatch({ type: "SET_MODAL", payload: isOpen });

  // if (modalType == "newTicket") {
  //   await dispatch({ type: "SET_NEWMODAL", payload: isOpen });
  // }
  // if (modalType == "deleteMessage") {
  //   await dispatch({ type: "SET_DELETEMODAL", payload: isOpen });
  // }
};
export const openMenue = (isOpen:boolean) => async (dispatch:Dispatch) => {
  await dispatch({ type: "SET_MENUE", payload: isOpen });
};
