var express = require("express");
var router = express.Router();
var Product = require("../models/product");

router.get("/categories", function (req, res, next) {
  Product.find({})
    .exec()
    .then((data) => {
      res.json(
        data
          .map((product) => product.category)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          })
      );
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/", function (req, res, next) {
  Product.find(
    req.query.category != "all" ? { category: req.query.category } : {}
  )
    .skip(20 * req.query.page)
    .limit(20)
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/:id", function (req, res, next) {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
