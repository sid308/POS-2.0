const express = require("express");
const router = express.Router();
const inventory = require("../services/inventory");


/* GET inventory */
router.get("/", async function (req, res, next) {
  try {
    res.json(await inventory.readInventory(req.query.page));
  } catch (err) {
    console.error(`Error while getting inventorys `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
    try {
      res.json(await inventory.readSingleWarehouseinventory(req.params.id));
    } catch (err) {
      console.error(`Error while getting inventorys `, err.message);
      next(err);
    }
  });


/* Create inventorys */
router.post("/", async function (req, res, next) {
  try {
    res.json(await inventory.create(req.body));
  } catch (err) {
    console.error(`Error while creating inventory`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await inventory.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating inventory `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await inventory.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting inventory`, err.message);
    next(err);
  }
});
module.exports = router;
