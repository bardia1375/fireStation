import Navbar from "./Navbar";
import Switcher from "./Switcher";
import Menue from "./Menue";
import Blur from "./Commons/Blur";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Main from "../Layouts/Main";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ProfileIndex from "../Pages/Profile/Index";
import { userLogOut } from "../Actions/User/user";
import { startConnection } from "../signalrService";
import { useLocation } from "react-router-dom";
import ProgressBar from "./publicTable/loading/ProgressBar";
import Devices from "../Pages/Devices/Devices";
import PersonnelContainer from "Pages/Personnel/PersonnelContainer";
import Stations from "Pages/Stations/Stations";
import StationsContainer from "Pages/Stations/StationsContainer";
import Report from "Pages/Report/Report";
import Setting from "Pages/Setting/Setting";

export default function Body() {
  const { isNewTicketModalOpen, isMobileMenueOpen } = useSelector(state => state.modal);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    dispatch(userLogOut());
  };

  //handle mobileMenue
  useEffect(() => {
    const connection = startConnection(handleReceiveMessage, canStartMission);

    return () => {
      // Cleanup on component unmount
      connection.stop();
    };
  }, []);
  const [bardia, setBardia] = useState(true);
  const canStartMission = missionId => {
    console.log("missionIdmissionIdmissionId", missionId);
    setBardia(missionId);
  };
  const handleReceiveMessage = id => {
    console.log("idididididididid", id);
  };
  const location = useLocation();

  // useEffect(()=>{
  //   canStartMission()
  // },[location.pathname])
  return (
    <div className="body__container">
      <Navbar />
      {bardia ? (
        <div
          style={{
            overflowY: isMobileMenueOpen || isNewTicketModalOpen ? "hidden" : "auto",
          }}
          className="Tickment"
        >
          {/* mobile menue */}
          {isMobileMenueOpen && <Menue />}
          {/* new ticket */}
          {/* switch bettwen newTicketBtn and allMyTicket on mobile */}
          {/* effect blur when modal opens */}
          {isNewTicketModalOpen && window.outerWidth > 768 && <Blur />}
          <Main>
            <Switch>
              {/* <Route
              path="/home"
              render={() => (window.outerWidth > 768 ? <></> : <TicketsList />)}
            /> */}

              <Route path="/questions" component={Devices} />
              <Route path="/devices" component={Devices} />
              <Route path="/setting" component={Setting} />
              <Route path="/reports" component={Report} />
              <Route path="/stations" exact component={StationsContainer} />
              <Route path="/stations/:id" component={StationsContainer} />
              <Route path="/personnel" exact component={PersonnelContainer} />
              {/* Route with :id for editing personnel */}
              <Route path="/personnel/:id" component={PersonnelContainer} />

              {/* <Route path="*" render={() => <Redirect to="/" />} /> */}
            </Switch>
          </Main>
        </div>
      ) : (
        <div
          style={{
            marginTop: "16%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressBar />
        </div>
      )}
    </div>
  );
}
