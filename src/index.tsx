import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { render } from "react-dom";
import { store } from "./Store/index";
import App from "./Containers/App";
import Theme from "./theme";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

render(
  <Provider store={store}>
    <Theme>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Theme>
  </Provider>,
  document.getElementById("app")
);
