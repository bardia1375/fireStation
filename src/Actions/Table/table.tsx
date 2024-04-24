import { ThunkAction } from "redux-thunk";
import { RootState } from "../../Reducers"; // Update this path according to your project structure
import { getAllDataService } from "../../Services/DevicesServices";
import { handleErrorResponse } from "../../Utils/commonFunctions";
import { Dispatch } from "redux";
import { CustomerSoftwareFeaturesBuy } from "Services/softwareServices";

export const getId = (item: any) => async (dispatch: any) => {
  await dispatch({ type: "SET_ITEM", payload: item });
};

export const getAllData =
  (
    API: string,
    dispatchType: string,
    Body,
    id?: string
  ): ThunkAction<Promise<{ allData: any[] }>, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const active = getState().tickets.isActive;
    const searchTerm = getState().tickets.searchTerm;
    const isSearching = getState().tickets.isSearching;
    // let body = "";
    // if (!!CustomerSoftwareId) {
    //   body = CustomerSoftwareId;
    // } else if (!!Status) {
    //   body = Status;
    // }
    let response;
    console.log("Bodyody", Body);

    try {
      response = isSearching
        ? await getAllDataService(API, Body, searchTerm)
        : await getAllDataService(API, Body, "");

      if ("error" in response) {
        handleErrorResponse(response);
        return { allData: [] };
      }

      const allData = response.data?.Data || [];

      await dispatch({
        type: dispatchType,
        payload: allData,
        allData: allData,
      });

      return { allData };
    } catch (error) {
      // Handle the case where an error is thrown during the API call
      handleErrorResponse({
        error: true,
        errorType: "API call error",
        errorBody: error,
      });
      return { allData: [] };
    }
  };

export const getAllSoftwareFeatures = async () => {
  const response = await CustomerSoftwareFeaturesBuy();
  if (response?.error) {
    handleErrorResponse(response);
  } else {
    return { AllSoftwareFeatures: response.data.Data };
  }
};

export const getSelectedItems = (data: string[]) => async (dispatch: Dispatch) => {
  await dispatch({ type: "SET_SELECTEDITEMS", payload: data });
};
