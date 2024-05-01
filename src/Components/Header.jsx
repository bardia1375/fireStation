import tikment from "assets/General/Asset.png";
export default function Header() {
  return (
    <div className="tickment__header__container">
      <div
        className="tickment__header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "8px",
          width: "100%",
        }}
      >
        <img src={tikment} style={{ width: "40px" }} />
        <div style={{ fontStretch: "200%" }}>تیکمنت</div>
      </div>
    </div>
  );
}
