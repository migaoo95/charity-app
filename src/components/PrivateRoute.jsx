//  Navigate -> Used to redirect , Outlet -> used to render child elements?
import { Navigate, Outlet } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
// import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useUserStatus();
  // This is for a spinner
  if (checkingStatus) {
    return null;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
