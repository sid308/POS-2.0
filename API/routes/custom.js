const express = require("express");
const router = express.Router();
const getStats = require("../services/custom");

router.get("/", async (req, res) => {
  const orders = await getStats();
  res.json(orders);
});

module.exports = router;
