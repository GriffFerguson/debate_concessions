"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const stripe_1 = __importDefault(require("stripe"));
const express_ws_1 = __importDefault(require("express-ws"));
require("dotenv").config();
const app = (0, express_ws_1.default)((0, express_1.default)()).app;
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
app.use(body_parser_1.default.text());
app.use(body_parser_1.default.json());
let active_orders = [];
app.post("/order", async (req, res) => {
    const order_data = {
        name: req.body.data.object.custom_fields[0].text.value,
        table: req.body.data.object.custom_fields[2].numeric.value,
        school: req.body.data.object.custom_fields[1].text.value
    };
    const id = req.body.data.object.id;
    const { line_items } = await stripe.checkout.sessions.retrieve(id, { expand: ["line_items"] });
    let list = [];
    for (var item of line_items.data) {
        list.push(item.description);
    }
    console.log(`${order_data.name} at table ${order_data.table} from ${order_data.school} ordered: ${JSON.stringify(list)}`);
    active_orders.unshift({
        name: order_data.name,
        table: order_data.table,
        school: order_data.school,
        items: list,
        id: id
    });
    res.writeHead(200);
    res.end();
});
app.ws("/order_list", (ws, req) => {
    let previouisOrderSet = [];
    setInterval(() => {
        if (previouisOrderSet != active_orders) {
            ws.send(JSON.stringify(active_orders));
        }
    }, 10000);
});
app.listen(4000);
