require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React" }],
  [2, { priceInCents: 20000, name: "Learn Css" }],
]);

app.post("/create-checkout-session", (req, res) => {
  res.json({ url: "hi" });
});
app.listen(3000);
