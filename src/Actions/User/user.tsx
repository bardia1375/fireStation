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
  console.log("reresponsesponse", response);

  if (response.error || !response.data.data) {
    console.log("error darim!");
    // handleErrorResponse(response);
    errorMessage(`نام کاربری یا رمز عبور اشتباه است`);
    await dispatch({ type: "USER_LOGIN_FAILURE", payload: true });
  } else {
    successMessage("با موفقیت وارد شدید");
    // localStorage.setItem(
    //   "Responsible",
    //   response.data.data.TokenInfo.FirstName + " " + response.data.data.TokenInfo.LastName
    // );
    // localStorage.setItem("Company", response.data.data.TokenInfo.Name);
    await dispatch({
      type: "VERIFY_USER_SUCCESS",
      payload: response.data.data,
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
  window.location.href = "/auth/login"; // هدایت به صفحه لاگین

  localStorage.removeItem("tickment_token");
  // localStorage.removeItem("refresh_token");
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
  await dispatch({ type: "USER_LOGOUT" });
};
// get profile
export const getprofile = () => async dispatch => {
  // const response = await getProfileService();
  // if (response?.error) {
  //   handleErrorResponse(response);
  // } else {
  //   const profileInformation = response?.data?.Data;
  //   localStorage.setItem("CanSendTicket", profileInformation[0].CanSendTicket);
  //   await dispatch({
  //     type: "VERIFY_USER_SUCCESS",
  //     payload: {
  //       CanSendTicket: profileInformation[0].CanSendTicket,
  //       profileInformation: profileInformation[0],
  //       //FirstName: Responsible.split(" ")[0],

  //       //LastName: Responsible.split(" ")[1],
  //       //Name: `${Industry} ${SubIndustry}`,
  //     },
  //   });
  // }
};
