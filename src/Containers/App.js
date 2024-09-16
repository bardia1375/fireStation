import { useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import Regestration from "./Regestration";
import PublicRoute from "../Routes/PublicRoute";
import PrivateRoute from "../Routes/PrivateRoute";
import Tickment from "./Tickment";
import { useEffect } from "react";
const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/auth" component={Regestration} isAuthenticated={true} />
          <PrivateRoute path="/" component={Tickment} isAuthenticated={true} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
