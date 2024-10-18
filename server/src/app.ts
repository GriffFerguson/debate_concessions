import Express from "express";
import BodyParser from "body-parser";

const app = Express();
app.use(BodyParser.text());
app.use(BodyParser.json());

app.post("/order", (req, res) => {
    console.log(req.body);
})

app.listen(4000);