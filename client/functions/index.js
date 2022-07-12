require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
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
      cancel_url: `${process.env.SERVER_URL}/`,
    });
    res.json({ url: session.url });
    // res.json({ url: "siema" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
