import { useDispatch } from "react-redux";
import { userLogOut } from "./../Actions/User/user";
import { useEffect } from "react";

export default function LogOut() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLogOut());
  }, []);
  return <>درحال خروج...</>;
}
