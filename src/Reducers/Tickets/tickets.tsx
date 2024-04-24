export interface TicketsState{
  isActive: number,
  ticketsData: any[],
  searchTerm: string,
  isSearching: boolean,
}
const initial:TicketsState = {
  isActive: 0,
  ticketsData: [],
  searchTerm: "",
  isSearching: false,
};

export const ticketsReducer = (state = initial , action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return { ...state, ticketsData: action.payload };
    case "SET_SEARCHTERM":
      return { ...state, searchTerm: action.payload };
    case "SET_ISSEARCHING":
      return { ...state, isSearching: action.payload };
    case "SET_ISACTIVE":
      return {
        ...state,
        isActive: action.payload ? 1 : 0,
      };

    default:
      return state;
  }
};
