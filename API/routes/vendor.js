const express = require("express");
const router = express.Router();
const vendor = require("../services/vendor");


/* GET all vendors */
router.get("/", async function (req, res, next) {
  try {
    res.json(await vendor.readVendor(req.query.page));
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});


/* GET a vendor */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await vendor.readSingleVendor(req.params.id));
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});


/* Create vendors */
router.post("/", async function (req, res, next) {
  try {
    res.json(await vendor.create(req.body));
  } catch (err) {
    console.error(`Error while creating vendor`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await vendor.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating vendor `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await vendor.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting vendor`, err.message);
    next(err);
  }
});
module.exports = router;
