const express = require("express");
const router = express.Router();
const warehouse = require("../services/warehouse");


/* GET warehouse */
router.get("/", async function (req, res, next) {
  try {
    res.json(await warehouse.readWarehouse(req.query.page));
  } catch (err) {
    console.error(`Error while getting warehouses `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await warehouse.readSingleWarehouse(req.params.id));
  } catch (err) {
    console.error(`Error while getting warehouses `, err.message);
    next(err);
  }
});


/* Create warehouses */
router.post("/", async function (req, res, next) {
  try {
    res.json(await warehouse.create(req.body));
  } catch (err) {
    console.error(`Error while creating warehouse`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await warehouse.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating warehouse `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await warehouse.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting warehouse`, err.message);
    next(err);
  }
});
module.exports = router;
