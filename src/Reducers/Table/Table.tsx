export interface TableState {
  devicesData: any[];
  softwaresData: any[];
  contractData: any[];
  orderData: any[];
  TableItem: any[];
  searchTerm?: string;
  isSearching?: boolean;
  isActive?: number; // Assuming isActive is a number
  selectedItems:string[]
}

const initial: TableState = {
  devicesData: [],
  softwaresData: [],
  contractData: [],
  orderData: [],
  TableItem: [],
  selectedItems:[]
};

export const tableReducer = (state: TableState = initial, action: any): TableState => {
  switch (action.type) {
    case "SET-DEVICES":
      return { ...state, devicesData: action.payload };
    case "SET-SOFTWARES":
      return { ...state, softwaresData: action.payload };
    case "SET-CONTRACT":
      return { ...state, contractData: action.payload };
    case "SET-ORDER":
      return { ...state, orderData: action.payload };
    case "SET_SEARCHTERM":
      return { ...state, searchTerm: action.payload };
    case "SET_ISSEARCHING":
      return { ...state, isSearching: action.payload };
    case "SET_ITEM":
      return { ...state, TableItem: action.payload };
    case "SET_SELECTEDITEMS":
      console.log("actionaction",action);
      
      return { ...state, selectedItems: action.payload };
    case "SET_ISACTIVE":
      return {
        ...state,
        isActive: action.payload ? 1 : 0,
      };

    default:
      return state;
  }
};
