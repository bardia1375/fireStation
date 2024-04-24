import React, { useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import MySoftwares from "./MySoftwares";
import MySoftwareModules from "./MySoftwareModules/MySoftwareModules";
import MySoftwareFacilities from "./MySoftwareFacilities/MySoftwareFacilities";

function MySoftwaresIndex() {
  const [softwareId, setSoftwareId] = useState(null);
  const [planId, setPlanId] = useState(null);

  const bodyControlPlanId = (data) => {
    setPlanId(data);
  };
  const bodyControlSoftwareId = (data) => {
    setSoftwareId(data);
  };
  let match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact  path={`${match.path}`}>
          <MySoftwares functionContractSoftId={bodyControlSoftwareId} />
        </Route>
        {/* And in this case it is /product/:id */}
        <Route exact path={`${match.path}/:id`}>
          <MySoftwareModules softwareId={softwareId} func={bodyControlPlanId} />
        </Route>
        <Route exact path={`${match.path}/Modules/Facilities`}>
          <MySoftwareFacilities softwareId={softwareId} func={bodyControlPlanId} />
        </Route>

      </Switch>
    </>
  );
}

export default MySoftwaresIndex;
