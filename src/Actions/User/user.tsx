import {
  userGetRecoveryCodeService,
  loginService,
  getProfileService,
} from "../../Services/authorizeService";
import jwt from "jwt-decode";
import { errorMessage, handleErrorResponse, successMessage } from "../../Utils/commonFunctions";
import { useSelector } from "react-redux";

// verify token
export const verifyToken = () => async dispatch => {
  const { Token } = useSelector(state => state.auth);
  const token = Token;
  if (token) {
    const decodedToken = jwt(token);
    const dateNow = Date.now() / 1000;
    if (decodedToken.exp < dateNow) {
      localStorage.removeItem("tickment_token");
      dispatch(userLogOut());
    } else {
      const decodedToken = jwt(token);

      await dispatch({
        type: "VERIFY_USER_SUCCESS",
        payload: { Token: token, expiredAt: decodedToken.exp },
      });
    }
  }
};
// login
export const userLogin = loginInfo => async dispatch => {
  await dispatch({ type: "USER_LOGIN_STARTED", payload: true });
  const response = await loginService(loginInfo);

  if (response.error || !response.data.Data) {
    console.log("error darim!");
    handleErrorResponse(response);
    response?.data?.Message && errorMessage(response.data?.Message);
    await dispatch({ type: "USER_LOGIN_FAILURE", payload: true });
  } else {
    successMessage("با موفقیت وارد شدید");
    localStorage.setItem(
      "Responsible",
      response.data.Data.TokenInfo.FirstName + " " + response.data.Data.TokenInfo.LastName
    );
    localStorage.setItem("Company", response.data.Data.TokenInfo.Name);

    await dispatch({
      type: "VERIFY_USER_SUCCESS",
      payload: response.data.Data,
    });
  }
};

// logOut
export const userLogOut = loginInfo => async dispatch => {
  // const response = await logOutService(loginInfo);
  // if (response.error) {
  //   handleErrorResponse(response);
  // } else {
  // }
  localStorage.removeItem("tickment_token");
  localStorage.removeItem("CanSendTicket");
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
  await dispatch({ type: "USER_LOGOUT" });
};
// get code
// export const userGetRecoveryCode = (mobile) => async (dispatch) => {
//   const response = await userGetRecoveryCodeService(mobile);
//   if (response.error) {
//     handleErrorResponse(response);
//   } else {
//     await dispatch({ type: "USER_LOGIN_STARTED", payload: response.data.data });
//   }
// };
// get profile
export const getprofile = () => async dispatch => {
  const response = await getProfileService();
  if (response?.error) {
    handleErrorResponse(response);
  } else {
    const profileInformation = response?.data?.Data;
    localStorage.setItem("CanSendTicket", profileInformation[0].CanSendTicket);
    await dispatch({
      type: "VERIFY_USER_SUCCESS",
      payload: {
        CanSendTicket: profileInformation[0].CanSendTicket,
        profileInformation: profileInformation[0],
        //FirstName: Responsible.split(" ")[0],

        //LastName: Responsible.split(" ")[1],
        //Name: `${Industry} ${SubIndustry}`,
      },
    });
  }
};
