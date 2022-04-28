const express = require("express");
const router = express.Router();
const login = require("../services/login");


/* Login */
router.post("/", async function (req, res, next) {
    try {
      res.json(await login.login(req.body));
    } catch (err) {
      console.error(`Error while creating customer`, err.message);
      next(err);
    }
  });





module.exports = router;
