export interface ModalState{
  isNewTicketModalOpen:boolean,
  isDeleteMessageModalOpen:boolean,
  isMobileMenueOpen:boolean
}

const initial:ModalState = {
  isNewTicketModalOpen: false,
  isDeleteMessageModalOpen: false,
  isMobileMenueOpen: false,
};
export const modalReducer = (state = initial, action) => {
  switch (action.type) {
    case "SET_NEWMODAL":
      return { ...state, isNewTicketModalOpen: action.payload };
    case "SET_DELETEMODAL":
      return { ...state, isDeleteMessageModalOpen: action.payload };
    case "SET_MENUE":
      return { ...state, isMobileMenueOpen: action.payload };

    default:
      return state;
  }
};
