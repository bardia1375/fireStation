import axios from "axios";
import { handleError } from "../Utils/commonFunctions";
import authapi from "./config.json";
import serverApi from "./httpService";
import { useDispatch } from "react-redux";

interface LoginInfoType {
  Username: string;
  Password: string;
}

// userLogin
export const loginService = async (loginInfo: LoginInfoType) => {
  try {
    const response = await serverApi.post(`GetToken`, loginInfo, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // console.log("response.data", response.data);

    localStorage.setItem("tickment_token", response.data.Data.Token);
    // const response = axios.post(`${authapi.authapi}login`, loginInfo)
    return response;
  } catch (error) {
    return handleError(error);
  }
};

// passwordRecovery
export const userGetRecoveryCodeService = async (mobile: string) => {
  try {
    return await axios.post(`${authapi.authapi}forgetPassword`, { mobile });
  } catch (error) {
    return handleError(error);
  }
};

// userProfile
export const getProfileService = async () => {
  // try {
  //   return await serverApi.get(`profile`);
  // } catch (error) {
  //   return handleError(error);
  // }
};

// changePassword
export const ChangePasswordService = async (formData: any) => {
  try {
    return await serverApi.post(`changePass`, formData);
  } catch (error) {
    return handleError(error);
  }
};
