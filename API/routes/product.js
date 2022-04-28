const express = require("express");
const router = express.Router();
const product = require("../services/product");


/* GET product */
router.get("/", async function (req, res, next) {
  try {
    res.json(await product.readProduct(req.query.page));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});


/* Create products */
router.post("/", async function (req, res, next) {
  try {
    res.json(await product.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await product.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await product.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});
module.exports = router;
