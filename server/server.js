require('dotenv').config()
// Import express
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('client'));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// console.log(process.env.STRIPE_PRIVATE_KEY)
if(process.env.SERVER_URL) { 
    console.log('It is set!'); 
}
else { 
    console.log('No set!'); 
}
// Route for an api --- backend apiss
// app.post("/api", async (req, res) => {
// //  return req.json({url: 'Hi'});
// //   req.body.items.map(item =>{
// //   console.log(items)
// //   })
// console.log(req.body.items)
// });
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React" }],
  [2, { priceInCents: 20000, name: "Learn Css" }],
]);
const item = [{priceInCents:10000, name:"learn React", quantity: 1} ]
console.log(item, 'item')
// 1. Uncomment
app.post('/api', async (req,res)=>{
    try {
        console.log(req.body.items)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item=>{
                return {
                    price_data:{
                        currency: "gbp",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.priceInCents
                    }, quantity:item.quantity
                }
            }),
        //     // line_items: req.body.items.map(item => {
        //     //   const storeItem = storeItems.get(item.id)
        //     //   return {
        //     //     price_data: {
        //     //       currency: "gbp",
        //     //       product_data: {
        //     //         name: storeItem.name,
        //     //       },
        //     //       unit_amount: storeItem.priceInCents,
        //     //     },
        //     //     quantity: item.quantity,
        //     //   }
        //     // }),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/test`,
          })
          res.json({ url: session.url })
    } catch (err){
        res.status(500).json({ error: err.message})
    }

})
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
