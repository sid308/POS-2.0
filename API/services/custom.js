const db = require("./connection");
const helper = require("../helper");
const config = require("../config");
const { each } = require("async");

const getCount = async (table) => {
  const count = await db.query(`SELECT COUNT(*) FROM ${table};`);
  return helper.emptyOrRows(count[0]["COUNT(*)"]);
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

async function getStats() {
  const [ordersCount, customers] = await Promise.all(
    ["orders", "customer"].map(async (table) => await getCount(table))
  );
  let pendingOrders = (
    await db.query(` SELECT * FROM orders WHERE note = 'pending'`)
  ).length;

  let orders = await db.query(` SELECT amount, order_date FROM orders `);

  let monthlySales = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  orders.map(
    (order) =>
      (monthlySales[months[order.order_date.getMonth()]] += Number(
        order.amount
      ))
  );
  return { orders: ordersCount, customers, pendingOrders, monthlySales };
}

module.exports = getStats;
