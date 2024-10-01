import { ThunkAction } from "redux-thunk";
import { RootState } from "../../Reducers"; // Update this path according to your project structure
import { getAllDataService } from "../../Services/DevicesServices";
import { handleErrorResponse } from "../../Utils/commonFunctions";
import { Dispatch } from "redux";
import { CustomerSoftwareFeaturesBuy } from "Services/softwareServices";

export const getId = (item: any) => async (dispatch: any) => {
  await dispatch({ type: "SET_ITEM", payload: item });
};


