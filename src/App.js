import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Private route component
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
// Toast Alerts
import { ToastContainer } from "react-toastify";
import Leyout from "./components/Leyout";
// Navbar
import Navbar from "./components/Navbar";
// user status
import { useUserStatus } from "../src/hooks/useUserStatus";
function App() {
  // get user Status
  const { loggedIn, checkingStatus } = useUserStatus();
  return (
    <div className="mainContainer  h-screen ">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <PrivateRoute />
              </>
            }
          >
            <Route
              path="/"
              element={
                <Leyout>
                  <HomePage />
                </Leyout>
              }
            />
            <Route
              path="/listing"
              element={
                <Leyout>
                  <Listings />
                </Leyout>
              }
            />
            <Route
              path="/create"
              element={
                <Leyout>
                  <CreateListing />
                </Leyout>
              }
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
