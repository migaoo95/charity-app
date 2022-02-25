import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import HomePage from "./pages/HomePage";
// Toast Alerts
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="signUpContainer  h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
