const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51KsqSUSGfr0JsMPHiGvrUlUhRYoPr424nOvKvI2rEPyykNNBsjcJ8MqZT1w2hHg9pFN1BsizCCkUMx0X3hdCXfDv00EheiRnRt"
);
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    token = req.body.token;
    const customer = stripe.customers
      .create({
        email: "",
        source: token.id,
      })
      .then((customer) => {
        console.log(customer);
        return stripe.paymentIntents.create({
          amount: 1000,
          description: "Test Purchase using express and Node",
          currency: "usd",
          customer: customer.id,
          payment_method_types: ["card"],
        });
      })
      .then((charge) => {
        console.log(charge);
        res.json({
          data: "success",
        });
      })
      .catch((err) => {
        res.json({
          data: "failure",
        });
      });
    return true;
  } catch (error) {
    return false;
  }
});

module.exports = router;
