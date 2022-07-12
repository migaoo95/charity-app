import { useEffect, useState } from "react";
import classes from "../styles/modules/Cart/Checkout.module.scss";
function Checkout({ disabled, items, shipping }) {
  const [backendData, setBackendData] = useState([{}]);
  const [checkoutItems, setCheckoutItems] = useState([{}]);
  const [shippingData, setShippingData] = useState([
    { typeName: "Standard", cost: 5, duration: [3, 5] },
    { typeName: "Express", cost: 9, duration: [1, 3] },
  ]);
  useEffect(() => {
    let itemsStripedStructure = [];
    if (items) {
      items.forEach((item) => {
        item = {
          priceInCents: item.price * 100,
          name: item.name,
          quantity: 1,
          images: [item.imageUrls[0]],
          currency: "usd",
        };
        itemsStripedStructure.push(item);
      });
      setCheckoutItems(itemsStripedStructure);
      //  console.log(items, 'Oryginal');
      //  console.log(itemsStripedStructure, 'Stripped');
    }

    // fetch("/api")
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then(({url}) => {
    //     // setBackendData(data);
    //     console.log(url);
    //   });
  }, [items]);
  const handleCheckout = () => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // TODO: Push items in here
        items: checkoutItems,
        shipping: shipping ? shippingData[0] : shippingData[1],
        // { priceInCents:10000, name:"learn React", quantity: 1 },
        // { priceInCents:10000, name:"learn React", quantity: 1 },
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
        // return res.json();
      })
      .then(({ url }) => {
        window.location = url;
        // console.log(url);
      })
      .catch((e) => {
        console.log(e.error);
      });
  };
  return (
    <div className={classes.buttonContainer}>
      <button
        disabled={disabled}
        className={`${disabled && classes.buttonContainer__disabled}`}
        onClick={handleCheckout}
      >
        Checkouttt
      </button>
    </div>
  );
}

export default Checkout;
