require("dotenv").config();
// Import express
const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.static(`${_dirname}/build`));
app.use(express.static(path.join(__dirname, "/build")));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// console.log(process.env.STRIPE_PRIVATE_KEY)
if (process.env.SERVER_URL) {
  console.log("It is set!");
} else {
  console.log("No set!");
}
// Route for an api --- backend apiss
// app.post("/api", async (req, res) => {
// //  return req.json({url: 'Hi'});
// //   req.body.items.map(item =>{
// //   console.log(items)
// //   })
// console.log(req.body.items)
// });
// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React" }],
//   [2, { priceInCents: 20000, name: "Learn Css" }],
// ]);
const item = [{ priceInCents: 10000, name: "learn React", quantity: 1 }];
console.log(item, "item");
// 1. Uncomment
app.post("/api", async (req, res) => {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: req.body.shipping.cost * 100,
              currency: "gbp",
            },
            display_name: req.body.shipping.typeName,
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: req.body.shipping.duration[0],
              },
              maximum: {
                unit: "business_day",
                value: req.body.shipping.duration[1],
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.name,
              images: item.images,
            },
            unit_amount: item.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });
    // res.json({ url: session.url });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(5000, () => console.log("server started on port 5000"));
/// -----------------------------------------------
//  require("dotenv").config();

// const express = require("express");
// const app = express();

// // app.use(express.json());

// // const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React" }],
//   [2, { priceInCents: 20000, name: "Learn Css" }],
// ]);

// app.post("/create-checkout-session", (req, res) => {
//  return res.json({ url: "hi" });
// });
// app.listen(5000);
