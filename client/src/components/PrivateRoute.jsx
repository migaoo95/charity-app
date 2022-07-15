import { Navigate, Outlet } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import Leyout from "./Leyout";
import Navbar from "./Navbar";
import classes from "../styles/modules/Leyout.module.scss";
import WatchList from "./WatchList";
import { useState } from "react";
// import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useUserStatus();
  const [modal, setModal] = useState(false);
  const handleModal = (msg) => {
    setModal((prev) => {
      return !prev;
    });
  };
  // This is for a spinner
  if (checkingStatus) {
    return null;
  }
  const handleHide = (msg) => {
    setModal((prev) => {
      return !prev;
    });
  };
  const removed = () => {
    console.log("removed");
  };
  return loggedIn ? (
    <div className={classes.mainRoute}>
      <Navbar showModal={handleModal} highlight={modal} />
      {modal && <WatchList removed={removed} handleHide={handleHide} />}
      <div className={modal && classes.mainRoute__blur}>
        <Leyout>
          <Outlet />
        </Leyout>
      </div>
    </div>
  ) : (
    <Navigate to="/signup" />
  );
};

export default PrivateRoute;
