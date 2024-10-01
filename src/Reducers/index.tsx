// reducers/index.ts

import { combineReducers } from "redux";
import { AuthState, authReducer } from "./AuthReducer/auth";
import { TableState, tableReducer } from "./Table/Table";
import { LoadingState, loadingReducer } from "./Loading/loding"; // Fix the typo in the import statement
import { ModalState, modalReducer } from "./Modal/modal";

// Define RootState
export type RootState = {
  auth: AuthState;
  loading: LoadingState;
  modal: ModalState;
  tableData: TableState;
  // Add other state slices as needed
};

export const reducers = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  modal: modalReducer,
  tableData: tableReducer,
});


