import { toast } from "react-toastify";

export const successMessage = (message) => {
  toast.success(message, {
    position: "top-right",
    closeOnClick: true,
  });
};

export const errorMessage = (message) => {
  toast.error(message, {
    position: "top-right",
    closeOnClick: true,
  });
};

export const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    return {
      error: true,
      errorType: "response",
      errorBody: error.response,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return { error: true, errorType: "request", errorBody: error.request };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { error: true, errorBody: error.message };
  }
};

export const handleErrorResponse = (result, showToast = true) => {
  switch (result.errorType) {
    case "request":
      errorMessage("خطای دسترسی به اینترنت");

      break;
    case "response":
      showToast &&
        errorMessage(
          (result.response && result.response.data.message) ||
            result.errorBody.data.message
        );

      break;

    default:
      errorMessage(result.errorBody);

      break;
  }
  return false;
};
export const convertEnglishNumberToPersian = (num) => {
  var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num?.toString().replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};
