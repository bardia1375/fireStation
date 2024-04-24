import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import MyContractDesign from "./MyContractDesign/MyContractDesign";
import MyContractOrderConfirm from "./MyContractOrderConfirm/MyContractOrderConfirm";
import MyContractSoft from "./MyContractSoft/MyContractSoft";

function Index() {
  const [softwareId, setSoftwareId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [ContractPackageId, setContractPackageId] = useState();
  const bodyControlPlanId = data => {
    console.log("CustomerSoftwareId234", ContractPackageId);

    setPlanId(data);
  };
  const bodyControlSoftwareId = data => {
    setSoftwareId(data);
  };
  const getContractPackageId = data => {
    console.log("CustomerSoftwareId234", ContractPackageId);
    setContractPackageId(data);
  };
  let match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`}>
          <MyContractSoft
            functionContractSoftId={bodyControlSoftwareId}
            getContractPackageId={getContractPackageId}
          />
        </Route>
        {/* And in this case it is /product/:id */}
        <Route exact path={`${match.path}/design/:SoftwareId`}>
          <MyContractDesign softwareId={ContractPackageId} func={bodyControlPlanId} />
        </Route>
        <Route exact path={`${match.path}/design/:SoftwareId/order`}>
          <MyContractOrderConfirm
            contractConfirmId={ContractPackageId}
            softwareId={softwareId}
            ContractPackageId={ContractPackageId}
          />
        </Route>
      </Switch>
    </>
  );
}

export default Index;
