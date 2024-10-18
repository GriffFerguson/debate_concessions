import Express from "express";
import BodyParser from "body-parser";
import Stripe from "stripe";
import cors from "cors";
require("dotenv").config();

const app = Express();
const stripe = new Stripe(process.env.STRIPE_KEY!);

app.use(BodyParser.text());
app.use(BodyParser.json());
app.use(cors());

type Order = {
    name: string,
    table: string,
    school: string,
    items: Array<string>,
    id: string
}

let active_orders: Array<Order> = [];

app.post("/order", async (req, res) => {
    const order_data = {
        name: req.body.data.object.custom_fields[0].text.value,
        table: req.body.data.object.custom_fields[2].numeric.value,
        school: req.body.data.object.custom_fields[1].text.value
    }
    const id = req.body.data.object.id;
    const { line_items } = await stripe.checkout.sessions.retrieve(id, {expand: ["line_items"]});

    let list = [];
    for (var item of line_items!.data) {
        list.push(item.description!);
    }

    console.log(`${order_data.name} at table ${order_data.table} from ${order_data.school} ordered: ${JSON.stringify(list)}`);
    
    active_orders.unshift({
        name: order_data.name,
        table: order_data.table,
        school: order_data.school,
        items: list,
        id: id
    })
    
    res.writeHead(200);
    res.end();
})

app.get("/order_list", (req, res) => {
    res.writeHead(200);
    res.end(JSON.stringify(active_orders));
})

app.listen(4000);