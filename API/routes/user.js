const express = require("express");
const router = express.Router();
const register = require("../services/user");
const userMiddleware = require("../middleware/user")

/* GET users */
router.get("/", userMiddleware.isLoggedIn ,async function (req, res, next) {
  try {
    res.json(await register.readUser(req.query.page));
  } catch (err) {
    console.error(`Error while getting Users `, err.message);
    next(err);
  }
});


router.get("/:id", userMiddleware.isLoggedIn , async function (req, res, next) {
    try {
      res.json(await register.readSingleUser(req.params.id));
    } catch (err) {
      console.error(`Error while getting user `, err.message);
      next(err);
    }
  });


/* Create registers */
router.post("/", async function (req, res, next) {
  try {
    res.json(await register.create(req.body));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
});

/* Create login */
router.post("/login", async function (req, res, next) {
  try {
    res.json(await register.login(req.body));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
});

/* Update customes */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await register.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating User `, err.message);
    next(err);
  }
});


/* delete customes */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await register.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting User`, err.message);
    next(err);
  }
});


// router.get("/test", async function (req, res, next) {
//   try {
//     res.json(await register.test(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting Users `, err.message);
//     next(err);
//   }
// });

module.exports = router;
