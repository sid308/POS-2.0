const express = require("express");
const router = express.Router();
const customer = require("../services/customer");


/* GET all customers */
router.get("/", async function (req, res, next) {
  try {
    res.json(await customer.readCustomer(req.query.page));
  } catch (err) {
    console.error(`Error while getting customers `, {message: err.message, success: false});
    next(err);
  }
});


/* GET a single customer */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await customer.readSingleCustomer(req.params.id));
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});


/* Create customers */
router.post("/", async function (req, res, next) {
  try {
    res.json(await customer.create(req.body));
  } catch (err) {
    console.error(`Error while creating customer`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await customer.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating customer `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await customer.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting customer`, err.message);
    next(err);
  }
});
module.exports = router;
