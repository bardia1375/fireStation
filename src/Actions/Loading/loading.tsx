import { Dispatch } from "redux";

export const setIsLoading = (isLoading: boolean) => async (dispatch: Dispatch) => {
  await dispatch({ type: "SET_LOADING", payload: isLoading });
};
