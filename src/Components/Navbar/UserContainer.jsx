export default function UserContainer({ children, style }) {
  return (
    <div className="tickment__navbar__userContainer" style={style}>
      {children}
    </div>
  );
}
