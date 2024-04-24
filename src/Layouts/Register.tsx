import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { RootState } from "../Store/index"; // Adjust the path accordingly

interface RegisterProps {
  children: React.ReactNode;
}

const Register: React.FC<RegisterProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <div className="register" id="register">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Register;
