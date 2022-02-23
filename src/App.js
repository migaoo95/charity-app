import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
function App() {
  return (
    <div className="signUpContainer  h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
