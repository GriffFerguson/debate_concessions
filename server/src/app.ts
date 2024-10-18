import Express from "express";
import BodyParser from "body-parser";
import Stripe from "stripe";
require("dotenv").config({path: "../.env"});


const app = Express();
const stripe = new Stripe(process.env.STRIPE_KEY!);

app.use(BodyParser.text());
app.use(BodyParser.json());

app.post("/order", async (req, res) => {
    const order_data = req.body.data.object.custom_fields;
    const id = req.body.data.object.id;
    
    const line_items = stripe.checkout.sessions.retrieve(id, {expand: ["line_items"]});

    console.log(order_data, id, line_items);
})

app.listen(4000);