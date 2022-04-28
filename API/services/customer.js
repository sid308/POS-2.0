const db = require("./connection");
const helper = require("../helper");
const config = require("../config");

//read all customers
async function readCustomer(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT customer.id, customer.name, customer.gst, customer.email, customer.phone, customer.created_on, customer.created_by, customer.updated_on, customer.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by, address.created_on, address.updated_on, address.updated_by, address.id AS address_id FROM customer inner join address 
    where customer.address_id = address.id LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
    success: true
  };
}

//read a customer
async function readSingleCustomer(id, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT customer.id, customer.name, customer.gst, customer.email, customer.phone, customer.created_on, customer.created_by, customer.updated_on, customer.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by, address.created_on, address.updated_on, address.updated_by, address.id AS address_id FROM customer inner join address 
    where customer.address_id = address.id AND customer.id = ? LIMIT ?,?`,
    [id, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//create customer
async function create(customer) {
  const address_result = await db.query(
    `INSERT INTO address  
    (address, city, state, pin_code, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      customer.address,
      customer.city,
      customer.state,
      customer.pin_code,
      customer.created_on,
      customer.created_by,
    ]
  );

  address_id = address_result.insertId;

  if (address_result.affectedRows) {
    const customer_result = await db.query(
      `INSERT INTO customer  
        (name, gst, email, address_id, phone, created_on, created_by) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)`,
      [
        customer.name,
        customer.gst,
        customer.email,
        address_id,
        customer.phone,
        customer.created_on,
        customer.created_by,
      ]
    );

    let message = "Error in creating customer";

    if (customer_result.affectedRows) {
      message = "Customer created successfully";
    }

    return { message };
  }

  let message = "Error in creating address ";

  if (customer_result.affectedRows) {
    message = "Customer created successfully";
  }

  return { message };
}

//update customer
async function update(id, customer) {
  const cutomerResult = await db.query(
    `UPDATE customer 
    SET name=?, phone=?, email=?, gst = ?,
    address_id = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      customer.name,
      customer.phone,
      customer.email,
      customer.gst,
      customer.address_id,
      customer.updated_on,
      customer.updated_by,
      id,
    ]
  );

  let message = "Error in updating customer";

  if (cutomerResult.affectedRows) {
    const addressResult = await db.query(
      `UPDATE address 
      SET address=?, city=?, state=?, pin_code = ?,
      updated_on = ?, updated_by = ?
      WHERE id=?`,
      [
        customer.address,
        customer.city,
        customer.state,
        customer.pin_code,
        customer.updated_on,
        customer.updated_by,
        customer.address_id,
      ]
    );

    message = "customer updated successfully";
  }

  return { message };
}

//delete customer
async function remove(id) {
  const address_id_result = await db.query(
    `SELECT address_id FROM customer WHERE customer.id = ?`,
    [id]
  );

  address_id = address_id_result[0].address_id;

  const deleteCustomerResult = await db.query(
    `DELETE FROM customer WHERE customer.id=?`,
    [id]
  );

  if (deleteCustomerResult.affectedRows) {
    const deleteAddressResult = await db.query(
      `DELETE FROM address WHERE address.id=?`,
      [address_id]
    );

    let message = "Error in deleting Adress";
    if (deleteAddressResult.affectedRows) {
      message = "Address deleted successfully";
    }
  }

  let message = "Error in deleting customer";

  //let message = address_id_result[0].address_id;

  if (deleteCustomerResult.affectedRows) {
    message = "Customer and Address deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readCustomer,
  readSingleCustomer,
};
