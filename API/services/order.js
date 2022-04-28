const db = require("./connection");
const helper = require("../helper");
const config = require("../config");
const { each } = require("async");

//read all orders
async function readOrder(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const order_items = await db.query(
    `
  SELECT order_item.id as order_item_id, order_item.product_id, order_item.warehouse_id, order_item.sold_price, order_item.sold_unit, order_item.order_id AS order_item_order_id, order_item.created_on, order_item.created_by, order_item.updated_on, order_item.updated_by  FROM orders inner join order_item on orders.id = order_item.order_id 
  LIMIT ?,?`,
    [offset, config.listPerPage]
  );

  const orders = await db.query(
    `
  SELECT * FROM orders`
  );

  // const orders = await db.query(
  //   `
  // SELECT * FROM orders WHERE id in (SELECT order_item.order_id FROM order_item WHERE order_item.order_id = orders.id)
  // LIMIT ?,?`,
  //   [offset, config.listPerPage]
  // );

  order_data = orders;

  // Convert date format
  order_data.forEach(
    (order) =>
      (order.order_date = new Intl.DateTimeFormat("en-US").format(
        order.order_date
      ))
  );

  order_items_array = [];
  for (var i in orders) {
    for (var j in order_items) {
      if (orders[i].id == order_items[j].order_item_order_id) {
        order_items_array.push(order_items[j]);
      }
    }
    order_data[i]["order_items"] = order_items_array;
    order_items_array = [];
  }

  const data = helper.emptyOrRows(order_data);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//read a order
async function readSingleOrder(id, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const order_items = await db.query(
    `SELECT order_item.id as order_item_id, order_item.product_id, order_item.warehouse_id, order_item.sold_price, order_item.sold_unit, order_item.order_id AS order_item_order_id, order_item.created_on, order_item.created_by, order_item.updated_on, order_item.updated_by  FROM orders inner join order_item on orders.id = order_item.order_id 
  WHERE order_item.order_id = ? LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );

  const orders = await db.query(
    `
  SELECT * FROM orders WHERE id in (SELECT order_item.order_id FROM order_item WHERE order_item.order_id = orders.id) AND orders.id = ?
  LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );

  order_data = orders;
  order_items_array = [];
  for (var i in orders) {
    for (var j in order_items) {
      if (orders[i].id == order_items[j].order_item_order_id) {
        order_items_array.push(order_items[j]);
      }
    }
    order_data[i]["order_items"] = order_items_array;
    order_items_array = [];
  }

  const data = helper.emptyOrRows(order_data);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(order) {
  try {
    let message = "creating order";
    const order_result = await db.query(
      `INSERT INTO orders
        (amount, order_date,  billing_address, shipping_address, payment_status, amount_paid, mode_of_payment, customer_id, note, created_on, created_by)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.amount,
        order.order_date,
        order.billing_address,
        order.shipping_address,
        order.payment_status,
        order.amount_paid,
        order.mode_of_payment,
        order.customer_id,
        order.note,
        order.created_on,
        order.created_by,
      ]
    );
    console.log(order_result);
    // await db.query(
    //   "UPDATE inventory SET stock = stock - ? WHERE product_id = ?",
    //   [order.qty, order.product_id]
    // );

    order_id = order_result.insertId;

    if (order_result.affectedRows) {
      for (var order_item in order.order_items) {
        const order_items_result = await db.query(
          `INSERT INTO order_item  
                        (product_id, warehouse_id, sold_price, sold_unit, order_id, created_on, created_by) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?)`,
          [
            order.order_items[order_item].product_id,
            order.order_items[order_item].warehouse_id,
            order.order_items[order_item].sold_price,
            order.order_items[order_item].sold_unit,
            order_id,
            order.order_items[order_item].created_on,
            order.order_items[order_item].created_by,
          ]
        );

        message = "error creating order_item";

        if (order_items_result.affectedRows) {
          message = "order items created successfully";
        }
      }
    }

    message = "Error in creating address ";

    if (order_result.affectedRows) {
      message = "Order created successfully";
    }

    return { message };
  } catch (error) {
    console.log(error);
    return error;
  }
}

//update order
async function update(id, order) {
  const order_result = await db.query(
    `UPDATE orders
    SET amount=?, order_date=?,
    payment_status = ?, amount_paid = ?, mode_of_payment =?, customer_id = ?, note = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      order.amount,
      order.order_date,
      //order.billing_address_id,
      //order.shipping_address_id,
      order.payment_status,
      order.amount_paid,
      order.mode_of_payment,
      order.customer_id,
      order.note,
      order.updated_on,
      order.updated_by,
      id,
    ]
  );

  //order_id = order.id;
  let message = "Error in updating order";

  if (order_result.affectedRows) {
    for (var order_item in order.order_items) {
      const order_items_result = await db.query(
        `UPDATE order_item 
        SET product_id = ?, warehouse_id = ?, sold_price = ?, sold_unit=?, order_id=?, updated_on=?, updated_by=?
        WHERE order_item.id = ? `,
        [
          order.order_items[order_item].product_id,
          order.order_items[order_item].warehouse_id,
          order.order_items[order_item].sold_price,
          order.order_items[order_item].sold_unit,
          id,
          order.order_items[order_item].updated_on,
          order.order_items[order_item].updated_by,
          order.order_items[order_item].order_item_id,
        ]
      );

      message = "error updating order_item";

      //what if order_items increases in order update ??

      if (order_items_result.affectedRows) {
        message = "order items updated successfully";
      }
    }
  }

  return { message };
}

//delete order
async function remove(id) {
  const order_item_result = await db.query(
    `SELECT id FROM order_item WHERE order_id = ?`,
    [id]
  );

  for (order_item in order_item_result) {
    const delete_order_item_result = await db.query(
      `DELETE FROM order_item WHERE id=?`,
      [order_item_result[order_item].id]
    );
  }

  const deleteorderResult = await db.query(`DELETE FROM orders WHERE id=?`, [
    id,
  ]);

  let message = "Error in deleting order";

  //let message = address_id_result[0].address_id;

  if (deleteorderResult.affectedRows) {
    message = "order and order_items deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readOrder,
  readSingleOrder,
};
