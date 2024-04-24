import { useSelector } from "react-redux";

export default function SwitchStatus() {
  const { isActive } = useSelector(state => state.tickets);
  console.log("isActive",isActive);
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => {}}
          onClick={e => e.stopPropagation()}
        />
        <span className="slider round"></span>
      </label>
      نمایش تیکت های باز
    </>
  );
}
