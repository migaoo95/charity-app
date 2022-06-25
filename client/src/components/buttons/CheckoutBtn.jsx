import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LEAw0LdahQvKULxx2CGblVg8uKQYHatUi8Ty1m3Wbgs4elSiGLeu2DbQfNW0ipeQ38bDoBfyKLimHZ2qtTV2cmI00mBwLEqdy"
    );
  }
  return stripePromise;
};
function Checkout() {
  const item = {
    price: "price_1LEBnnLdahQvKULxG1T0l5Sr",
    quantity: 1,
  };
  const item2 = {
    price: "price_1LEDWjLdahQvKULxTbzXTsD5",
    quantity: 1,
  };
  const items = [
    {
      price: "price_20",
      quantity: 1,
    },
    {
      price: "price_200",
      quantity: 1,
    },
  ];
  const checkoutOptions = {
    lineItems: items,
    mode: "payment",
    successUrl: `${window.location.origin}/`,
    cancelUrl: `${window.location.origin}/test`,
  };
  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={redirectToCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Checkout;
