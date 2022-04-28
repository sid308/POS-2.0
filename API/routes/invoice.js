const express = require("express");
const router = express.Router();
const invoice = require("../services/invoice");


/* GET all invoices */
router.get("/", async function (req, res, next) {
  try {
    res.json(await invoice.readInvoice(req.query.page));
  } catch (err) {
    console.error(`Error while getting invoices `, err.message);
    next(err);
  }
});


/* GET a single invoice */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await invoice.readSingleInvoice(req.params.id));
  } catch (err) {
    console.error(`Error while getting invoices `, err.message);
    next(err);
  }
});


/* Create invoices */
router.post("/", async function (req, res, next) {
  try {
    res.json(await invoice.create(req.body));
  } catch (err) {
    console.error(`Error while creating invoice`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await invoice.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating invoice `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await invoice.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting invoice`, err.message);
    next(err);
  }
});
module.exports = router;
