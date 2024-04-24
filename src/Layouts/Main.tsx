import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AsideList from "../Components/AsideList";
import Loading from "../Components/Commons/Loading";
import NewTicketButton from "../Components/NewTicketButton";
import Search from "../Components/Search";
import MainContainer from "../Containers/MainContainer";
import Switcher from "../Components/Switcher";
import SideBar from "../Components/SideBar";
import { RootState } from "Reducers";


interface MainProps {
  children: ReactNode;
}


const Main: React.FC<MainProps> = ({ children }) => {
  const isloading = useSelector((state: RootState) => state.loading);
  const { isSearching, searchTerm } = useSelector(
    (state: RootState) => state.tickets
  );
  const { CanSendTicket } = useSelector((state: RootState) => state.auth);

  const location = useHistory();

  return (
    <MainContainer>
      <AsideList>
        {location.location?.pathname.includes("/ticket") ? (
          <NewTicketButton />
        ) : (
          <div />
        )}
        {location.location?.pathname.includes("/ticket") ? (
          <div
            style={{
              height: "100%",
              paddingTop: "24%",
              overflow: "hidden",
            }}
          >
            <Search />
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              paddingTop: "18%",
              overflowY: "scroll",
            }}
          >
            <SideBar />
          </div>
        )}
      </AsideList>

      {isloading && <Loading />}
      <Switcher path={location.location?.pathname} />
      <main className="main">{children}</main>
    </MainContainer>
  );
};

export default Main;
