import { useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import Regestration from "./Regestration";
import PublicRoute from "../Routes/PublicRoute";
import PrivateRoute from "../Routes/PrivateRoute";
import Tickment from "./Tickment";
import { usePermissions } from "../Context/PermissionContext"; // مسیر کانتکست
import { useEffect } from "react";

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { userPermissions, isLoading, error, fetchPermissions } = usePermissions();

  useEffect(() => {
    fetchPermissions(); // اطلاعات دسترسی را هنگام بارگذاری صفحه بگیریم
  }, [fetchPermissions]);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/auth" component={Regestration} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/" component={Tickment} isAuthenticated={isAuthenticated} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
