module.exports = {
  create: (req, res, nex) => {
    console.log(req.body);
    const db = req.app.get("db");
    const { name, description, price, imageurl } = req.body;

    db.create_product([name, description, price, imageurl])
      .then(response => res.sendStatus(200)) //res//
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOne: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    //can I do line 17 instead of solutions const{params} = req followed by db.read_product([params.id])
    db.read_product(id).then(product =>
      res
        .status(200)
        .send(product)

    ).catch(err => {
      res.status(500).send("error");
    });
  },
  getAll: (req, res, next) => {
    const db = req.app.get("db");
    db.read_products().then(products =>
      res
        .status(200)
        .send(products)
    ).catch(err => {
      res.status(500).send("error");
    })
      ;
  },
  //We only send back on get???
  //why wouldn't product be sent back on update??? can there be a product in CB funct and status???
  update: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { desc } = req.query;

    db.update_product([id, desc]).then(() => {
      res
        .sendStatus(200)
    }).catch(err => {
      res.status(500).send("error");
    });;
  },
  delete: () => {
    const db = req.app.get("db");
    const { params } = req;

    db.delete_product([params.id]).then(res => {
      res.sendStatus(200);
    }).catch(err => {
      res.status(500).send("error");
    });
  }
};
