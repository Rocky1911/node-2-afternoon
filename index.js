require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const massive = require("massive");
const port = 3000;
const products_controller = require("./products.controller");

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    // console.log('HIT!!!!');
    app.set("db", db)
  })
  .catch(err => console.log(err));

app.post("/api/product", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id?desc=", products_controller.update);
app.delete("/api/product/:id", products_controller.delete);
app.listen(port, () => console.log(`Listening on  ${port}`));
