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
// Navbar
import Navbar from "./components/Navbar";
// user status
import { useUserStatus } from "../src/hooks/useUserStatus";
function App() {
  // get user Status
  const { loggedIn, checkingStatus } = useUserStatus();
  return (
    <div className="signUpContainer  h-screen ">
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
            <Route path="/" element={<HomePage />} />
            <Route path="/listing" element={<Listings />} />
            <Route path="/create" element={<CreateListing />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
