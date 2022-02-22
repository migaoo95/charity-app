import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div className="signUpContainer container h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
