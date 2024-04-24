export interface AuthState {
  Token: string | null; // manage the access token
  expiredAt: Date | null; // manage expiry time of the access token

  authLoading: boolean; // to indicate that the auth API is in progress
  isAuthenticated: boolean; // consider as an authentication flag
  userLoginLoading: boolean; // to indicate that the user signin API is in progress
  loginError: string | null; // manage the error of the user signin API
  FirstName: string;
  LastName: string;
  Name: string;
  ProfileCompleted: boolean;
  NewMessages: number;
  Type: string;
  CanSendTicket: boolean;
  Status: number;
  Url: string;
  Email: string;
  NationalCode: string;
  EconomicCode: string;
  RegNumber: string;
  StatusName: string;
  Industry: string;
  SubIndustry: string;
  Responsible: string;
  Province: string;
  City: string;
  Fax: string;
  Address: string;
  PostalCode: string;
  // Add other properties as needed
}

const initialState: AuthState = {
  Token: null,
  expiredAt: null,
  authLoading: true,
  isAuthenticated: false,
  userLoginLoading: false,
  loginError: null,
  FirstName: "",
  LastName: "",
  Name: "",
  ProfileCompleted: false,
  NewMessages: 0,
  Type: "",
  CanSendTicket: false,
  Status: 1,
  Url: "",
  Email: "",
  NationalCode: "",
  EconomicCode: "",
  RegNumber: "",
  StatusName: "",
  Industry: "",
  SubIndustry: "",
  Responsible: "",
  Province: "",
  City: "",
  Fax: "",
  Address: "",
  PostalCode: "",
};

// update store based on type and payload and return the state
export const authReducer = (state: AuthState = initialState, action: any): AuthState => {
  const token = localStorage.getItem("tickment_token");
  if (token) {
    return {
      ...state,
      Token: token,
      isAuthenticated: true,
    };
  }
  switch (action.type) {
    // verify token - started
    case "VERIFY_TOKEN_STARTED":
      const { silentAuth } = action.payload;
      return silentAuth
        ? {
            ...state,
          }
        : initialState;
    // verify token - ended/failed
    case "VERIFY_TOKEN_END":
      return {
        ...state,
        authLoading: false,
      };
    // user login - started
    case "USER_LOGIN_STARTED":
      return {
        ...state,
        userLoginLoading: true,
      };
    // user login - ended/failed
    case "USER_LOGIN_FAILURE":
      const { error } = action.payload;
      console.log("action.payloadFAILURE", action.payload);

      return {
        ...state,
        loginError: error,
        userLoginLoading: false,
      };
    // verify token - success
    case "VERIFY_USER_SUCCESS":
      console.log("action.payload", action.payload);
      const token = localStorage.getItem("tickment_token");
      console.log("tokentoken", token);

      return {
        ...state,
        Token: token,
        isAuthenticated: true,
        authLoading: false,
        userLoginLoading: false,
        // ...action.payload,
      };

    case "USER_LOGOUT":
      console.log("action.payloadFAILURE", action.payload);

      return {
        ...initialState,
        authLoading: false,
        isAuthenticated: false,
        Token: "",
      };
    default:
      return state;
  }
};
