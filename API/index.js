const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const custRouter = require("./routes/customer");
const productRouter = require("./routes/product");
const vendorRouter = require("./routes/vendor");
const warehouseRouter = require("./routes/warehouse");
const ProductStockRouter = require("./routes/inventory");
const UserRouter = require("./routes/user");
const LoginRouter = require("./routes/login");
const orderRouter = require("./routes/order");
const invoiceRouter = require("./routes/invoice");
const customRouter = require("./routes/custom");
const paymentRouter = require("./routes/payment");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "fine" });
});

app.use("/customer", custRouter);
app.use("/product", productRouter);
app.use("/vendor", vendorRouter);
app.use("/warehouse", warehouseRouter);
app.use("/inventory", ProductStockRouter);
app.use("/user", UserRouter);
app.use("/login", LoginRouter);
app.use("/order", orderRouter);
app.use("/invoice", invoiceRouter);
app.use("/custom", customRouter);
app.use("/payment", paymentRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
