import { useEffect, useState } from "react";
function Checkout() {
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    // fetch("/api")
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then(({url}) => {
    //     // setBackendData(data);
    //     console.log(url);
    //   });
  }, []);
  const handleCheckout = () => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { priceInCents:10000, name:"learn React", quantity: 1 },
          { priceInCents:10000, name:"learn React", quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
        // return res.json();
      })
      .then(({ url }) => {
        // window.location = url;
        console.log(url);
      })
      .catch((e) => {
        console.log(e.error);
      });
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleCheckout}>
        Checkouttt
      </button>
    </div>
  );
}

export default Checkout;
