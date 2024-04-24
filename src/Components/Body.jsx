import Navbar from "./Navbar";
import Switcher from "./Switcher";
import Menue from "./Menue";
import NewTicket from "./../Pages/NewTicket";
import Blur from "./Commons/Blur";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import TicketsList from "./../Pages/TicketsList";
import Ticket from "../Pages/Ticket";
import Main from "./../Layouts/Main";
import { useSelector } from "react-redux";
import { useState } from "react";
import Home from "../Pages/Home/Home";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Videos from "../Pages/Videos/Videos";
import Faq from "../Pages/Faq/Faq";
import MyOrder from "../Pages/MyOrder/MyOrder";
import MyContract from "../Pages/MyContract/MyContract";
import DevicesList from "../Pages/MyDevices/DevicesList";
import MySoftwares from "../Pages/MySoftwares/MySoftwares";
import MyContractSoft from "../Pages/MyContract/MyContractSoft/MyContractSoft";
import index from "../Pages/MyContract";
import Index from "../Pages/MyOrder";
import Profile from "../Pages/Profile/Profile";
import ProfileIndex from "../Pages/Profile/Index";
import { userLogOut } from "../Actions/User/user";
import MySoftwaresIndex from "../Pages/MySoftwares";

export default function Body() {
  const { isNewTicketModalOpen, isMobileMenueOpen } = useSelector(state => state.modal);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    dispatch(userLogOut());
  };

  //handle mobileMenue

  return (
    <div className="body__container">
      <Navbar />

      <div
        style={{
          overflowY: isMobileMenueOpen || isNewTicketModalOpen ? "hidden" : "auto",
        }}
        className="Tickment"
      >
        {/* mobile menue */}
        {isMobileMenueOpen && <Menue />}
        {/* new ticket */}
        {isNewTicketModalOpen && <NewTicket />}
        {/* switch bettwen newTicketBtn and allMyTicket on mobile */}
        {/* effect blur when modal opens */}
        {isNewTicketModalOpen && window.outerWidth > 768 && <Blur />}
        <Main>
          <Switch>
            {/* <Route
              path="/home"
              render={() => (window.outerWidth > 768 ? <></> : <TicketsList />)}
            /> */}
            <Route path="/" exact>
              <Home handleExit={handleLogout} />
            </Route>
            <Route path="/ticket/:id" component={Ticket} />
            <Route path="./ticket" component={Ticket} />
            <Route path="/mySoftware" component={MySoftwaresIndex} />
            {/* <Route path="/myapp/bardia" component={Index} /> */}

            <Route path="/mydevice" component={DevicesList} />
            {/* <Route path="/myorder/payment" component={Index} /> */}
            <Route path="/myorder" component={Index} />
            <Route path="/mycontract/software" component={index} />
            <Route path="/mycontract" component={MyContract} />
            <Route path="/questions" component={Faq} />
            <Route path="/videos" component={Videos} />
            <Route path="/myDownloads" component={Ticket} />
            <Route path="/myConsent" component={Ticket} />
            <Route path="/profile" component={ProfileIndex} />
            {/* <Route path="*" render={() => <Redirect to="/" />} /> */}
          </Switch>
        </Main>
      </div>
    </div>
  );
}
