import React, { useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import MyOrder from "./MyOrder";

import MyOrderPayment from "./MyOrderPayment/MyOrderPayment";
import MyOrderPaymentDetail from "./MyOrderPaymentDetail/MyOrderPaymentDetail";

function Index() {
  const [softwareId, setSoftwareId] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const bodyControlOrderId = (data) => {
    setOrderId(data);
  };
  let match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`}>
          <MyOrder   funcOrderId={bodyControlOrderId}/>
        </Route>
        <Route exact path={`${match.path}/payment`}>
          <MyOrderPayment  orderArrayBody={orderId} />
        </Route>
        {/* And in this case it is /product/:id */}
        <Route exact path={`${match.path}/payment/confirm`}>
          <MyOrderPaymentDetail orderArrayBody={orderId} />
        </Route>
      </Switch>
    </>
  );
}

export default Index;
