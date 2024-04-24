import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthToken } from "./../Services/httpService";

import Header from "./../Components/Header";

import Body from "../Components/Body";
import Footer from "./../Components/Footer";

const Tickment = ({ location }) => {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
    setAuthToken();
  }, []);


  return (
    <div style={{width:"100%",height:"100vh"}}>
      {/* <Header /> */}
       
      <Body location={location} />

      <Footer style={{          position: "absolute",
          bottom: "0px",
          right: "50%",
          transform: "translate(50%, 0)"}}/>
    </div>
  );
};

export default Tickment;
