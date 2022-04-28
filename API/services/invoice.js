const db = require("./connection");
const helper = require("../helper");
const config = require("../config");
const { each } = require("async");

//read all orders
async function readInvoice(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM orders 
       LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//read a order
async function readSingleInvoice(id, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const order_items = await db.query(
    `SELECT order_item.id as order_item_id, order_item.product_id, order_item.warehouse_id, order_item.sold_price, order_item.sold_unit, order_item.order_id AS order_item_order_id, order_item.created_on, order_item.created_by, order_item.updated_on, order_item.updated_by,

    product.id AS  product_id, product.name AS product_name, product.unit_price, product.hsn_code,product.created_on AS product_created_on, product.created_by AS product_created_by, product.updated_on AS product_updated_on, product.updated_by AS product_updated_on,

    warehouse.id AS warehouse_id, warehouse.name AS warehouse_name 

    FROM orders join order_item on orders.id = order_item.order_id
    JOIN product ON order_item.product_id = product.id
    JOIN warehouse ON order_item.warehouse_id = warehouse.id 
  WHERE order_item.order_id = ? LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );

  const orders = await db.query(
    `
    SELECT orders.id AS order_id, orders.amount,orders.order_date, orders.shipping_address_id,orders.billing_address_id,orders.payment_status, orders.amount_paid, orders.mode_of_payment, orders.customer_id,orders.note,orders.created_on,orders.created_by,orders.updated_on,orders.updated_by,

customer.name AS customer_name, customer.gst, customer.email, customer.phone, customer.created_on, customer.created_by,customer.updated_on,customer.updated_by,customer.address_id, 

cs.id AS customer_id, cs.address AS customer_address, cs.city AS customer_address_city,cs.state as customer_address_state, cs.pin_code AS customer_address_pin_code, cs.created_on AS customer_address_created_on, cs.created_by AS customer_address_created_by, cs.updated_on as customer_address_updated_on, cs.updated_by as customer_address_updated_by,


address.id AS shipping_address_id, address.address AS shipping_address, address.city AS shipping_address_city,address.state as shipping_address_state, address.pin_code AS shipping_address_pin_code, address.created_on AS shipping_address_created_on, address.created_by AS shipping_address_created_by, address.updated_on as shipping_address_updated_on, address.updated_by as shipping_address_updated_by,

ad.id AS billing_address_id, ad.address AS billing_address, ad.city AS billing_address_city,ad.state as billing_address_state, ad.pin_code AS billing_address_pin_code, ad.created_on AS billing_address_created_on, ad.created_by AS billing_address_created_by, ad.updated_on as billing_address_updated_on, ad.updated_by as billing_address_updated_by

FROM orders JOIN address ON orders.shipping_address_id = address.id 
 JOIN address ad ON orders.billing_address_id = ad.id
 JOIN customer ON orders.customer_id = customer.id
  JOIN address cs ON customer.address_id = cs.id
 WHERE orders.id= ?
  LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );

  order_data = orders;
//   order_items_array = [];
//   for (var i in orders) {
//     for (var j in order_items) {
//       if (orders[i].id == order_items[j].order_item_order_id) {
//         order_items_array.push(order_items[j]);
//       }
//     }
//     order_data[i]["order_items"] = order_items_array;
//     order_items_array = [];
//   }


    order_data[0]["order_items"] = order_items;

  const data = helper.emptyOrRows(order_data);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(order) {}

//update order
async function update(id, order) {
  
}

//delete order
async function remove(id) {

  const deleteinvoiceResult = await db.query(`DELETE FROM orders WHERE id=?`, [
    id,
  ]);

  let message = "Error in deleting order";

  //let message = address_id_result[0].address_id;

  if (deleteinvoiceResult.affectedRows) {
    message = "Invoice deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readInvoice,
  readSingleInvoice,
};
