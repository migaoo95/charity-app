import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import { ToastContainer } from "react-toastify";
import Charities from "./pages/Charities";
import Charity from "./pages/Charity";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
// TODO: --------------------- Stripe
import Checkout from "./components/Checkout";
import "@stripe/stripe-js";
import Success from "./pages/CheckoutOptions/Success";
function App() {
  return (
    <div className="mainContainer">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route
            path="/"
            element={
              <>
                <PrivateRoute />
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/:productId" element={<ProductPage />} />
            <Route path="/listing" element={<Listings />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/charities" element={<Charities />} />
            <Route path="/charities/:itemId" element={<Charity />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            {/* Testing Route */}
            <Route path="/test" element={<Checkout />} />
            
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
