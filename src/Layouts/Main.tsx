import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AsideList from "../Components/AsideList";
import Loading from "../Components/Commons/Loading";
import MainContainer from "../Containers/MainContainer";
import SideBar from "../Components/SideBar";
import { RootState } from "Reducers";

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const isloading = useSelector((state: RootState) => state.loading);


  return (
    <MainContainer>
      <AsideList>
          <div
            style={{
              height: "100%",
              paddingTop: "18%",
              overflowY: "scroll",
            }}
          >
            <SideBar />
          </div>

      </AsideList>

      {isloading && <Loading />}
      <main className="main">{children}</main>
    </MainContainer>
  );
};

export default Main;
