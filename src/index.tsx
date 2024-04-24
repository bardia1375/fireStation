import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { render } from "react-dom";
import { store } from "./Store/index";
import App from "./Containers/App";
import Theme from "./theme";

render(
  <Provider store={store}>
    <Theme>
      <ToastContainer />
      <App />
    </Theme>
  </Provider>,
  document.getElementById("app")
);
