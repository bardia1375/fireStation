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
import Report from "Pages/Report/Report";
import Setting from "Pages/Setting/Setting";
import DashboardContainer from "Pages/Dashboard/DashboardContainer";
import Stations from "Pages/Stations/Stations";
import ReportContainer from "Pages/Report/ReportContainer";
import LogsContainer from "Pages/Logs/LogsContainer";

export default function Body() {
  const { isNewTicketModalOpen, isMobileMenueOpen } = useSelector(state => state.modal);


  //handle mobileMenue
  useEffect(() => {
    const connection = startConnection(handleReceiveMessage);

    return () => {
      // Cleanup on component unmount
      connection.stop();
    };
  }, []);

  const handleReceiveMessage = id => {
    console.log("idididididididid", id);
  };
  const location = useLocation();


  return (
    <div className="body__container">
      <Navbar />
      {true ? (
        <div
          style={{
            overflowY: isMobileMenueOpen || isNewTicketModalOpen ? "hidden" : "auto",
          }}
          className="Tickment"
        >

          {isMobileMenueOpen && <Menue />}

          <Main>
            <Switch>


              <Route path="/questions" component={Devices} />
              <Route path="/devices" component={Devices} />
              <Route path="/setting" component={Setting} />
              <Route path="/logs" component={LogsContainer} />

              <Route path="/reports" component={Report} />
              <Route path="/stations" exact component={Stations} />
              <Route path="/stations/:id" exact component={Stations} />

              <Route path="/dashboard" exact component={DashboardContainer} />
              <Route path="/Dashboard/:id" component={DashboardContainer} />
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
