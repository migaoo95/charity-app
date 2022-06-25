//  Navigate -> Used to redirect , Outlet -> used to render child elements?
import { Navigate, Outlet } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import Leyout from "./Leyout";
import Navbar from "./Navbar";
import classes from "../styles/modules/Leyout.module.scss";
// import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useUserStatus();
  // This is for a spinner
  if (checkingStatus) {
    return null;
  }
  return loggedIn ? (
    <div className={classes.mainRoute}>
      <Navbar />
      <Leyout>
        <Outlet />
      </Leyout>
    </div>
  ) : (
    <Navigate to="/signup" />
  );
};

export default PrivateRoute;
