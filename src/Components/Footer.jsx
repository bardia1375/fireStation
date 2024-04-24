import { useSelector } from "react-redux";

export default function Footer({ style }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="tickment__footer__container" style={style}>
      <div className="tickment__footer">
        <div
          className="login__socialMedia-mobile"
          style={{ display: isAuthenticated ? "none" : "block" }}
        >
          <img src="/images/twiter-icon.svg" alt="twiter" />
          <img src="/images/telegram-icon.svg" alt="telegram" />
          <img src="/images/instagram-icon.svg" alt="instagram" />
          <img src="/images/aparat-icon.svg" alt="aparat" />
          <img src="/images/website-icon.svg" alt="website" />
        </div>
        <div className="tickment__copyRight">
          <img
            src="/images/copyRight.svg"
            alt=""
            style={{
              width: "auto",
              marginLeft: "2rem",
            }}
          />
          <div
            className="verticalDevider"
            style={{
              background: "var(--secondary)",
            }}
          />
          <div className="login__socialMedia">
            <img src="/images/twiter-icon.svg" alt="twiter" />
            <img src="/images/telegram-icon.svg" alt="telegram" />
            <img src="/images/instagram-icon.svg" alt="instagram" />
            <img src="/images/aparat-icon.svg" alt="aparat" />
            <img src="/images/website-icon.svg" alt="website" />
          </div>
          <div
            className="verticalDevider"
            style={{
              background: "var(--secondary)",
            }}
          />
          <img style={{ marginRight: "2rem" }} src="/images/company-logo.svg" alt="jahangostar" />
        </div>
      </div>
    </div>
  );
}
