const express = require("express");
const router = express.Router();
const order = require("../services/order");

/* GET all orders */
router.get("/", async function (req, res, next) {
  try {
    res.json(await order.readOrder(req.query.page));
  } catch (err) {
    console.error(`Error while getting orders `, err.message);
    next(err);
  }
});

/* GET a single order */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await order.readSingleOrder(req.params.id));
  } catch (err) {
    console.error(`Error while getting orders `, err.message);
    next(err);
  }
});

/* Create orders */
router.post("/", async function (req, res, next) {
  try {
    res.json(await order.create(req.body));
  } catch (err) {
    console.error(`Error while creating order`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await order.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating order `, err.message);
    next(err);
  }
});

/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await order.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting order`, err.message);
    next(err);
  }
});
module.exports = router;
