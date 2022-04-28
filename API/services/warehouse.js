const db = require("./connection");
const helper = require("../helper");
const config = require("../config");

//read all warehouses
async function readWarehouse(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT warehouse.id, warehouse.name, warehouse.address_id, warehouse.amount, warehouse.weight, warehouse.created_on, warehouse.created_by, warehouse.updated_on, warehouse.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by AS address_created_by, address.created_on AS address_created_on, address.updated_on AS address_updated_on, address.updated_by AS address_updated_by, address.id AS address_id FROM warehouse inner join address 
    where warehouse.address_id = address.id LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// read a single warehouse
async function readSingleWarehouse(id,page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT warehouse.id, warehouse.name, warehouse.address_id, warehouse.amount, warehouse.weight, warehouse.created_on, warehouse.created_by, warehouse.updated_on, warehouse.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by AS address_created_by, address.created_on AS address_created_on, address.updated_on AS address_updated_on, address.updated_by AS address_updated_by, address.id AS address_id FROM warehouse inner join address 
    where warehouse.address_id = address.id AND warehouse.id = ? LIMIT ?,?`,
    [id,offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//create warehouse
async function create(warehouse) {
  const address_result = await db.query(
    `INSERT INTO address  
    (address, city, state, pin_code, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      warehouse.address,
      warehouse.city,
      warehouse.state,
      warehouse.pin_code,
      warehouse.created_on,
      warehouse.created_by,
    ]
  );

  address_id = address_result.insertId;

  if (address_result.affectedRows) {
    const warehouse_result = await db.query(
      `INSERT INTO warehouse  
        (name, address_id, amount, weight, created_on, created_by) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`,
      [
        warehouse.name,
        address_id,
        warehouse.amount,
        warehouse.weight,
        warehouse.created_on,
        warehouse.created_by,
      ]
    );

    let message = "Error in creating warehouse";

    if (warehouse_result.affectedRows) {
      message = "warehouse created successfully";
    }

    return { message };
  }

  let message = "Error in creating address ";

  if (warehouse_result.affectedRows) {
    message = "warehouse and address created successfully";
  }

  return { message };
}

//update warehouse
async function update(id, warehouse) {
  const cutomerResult = await db.query(
    `UPDATE warehouse 
    SET name=?, weight=?, amount=?,
    address_id = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      warehouse.name,
      warehouse.weight,
      warehouse.amount,
      warehouse.address_id,
      warehouse.updated_on,
      warehouse.updated_by,
      id,
    ]
  );

  let message = "Error in updating warehouse";

  if (cutomerResult.affectedRows) {
    const addressResult = await db.query(
      `UPDATE address 
      SET address=?, city=?, state=?, pin_code = ?,
      updated_on = ?, updated_by = ?
      WHERE id=?`,
      [
        warehouse.address,
        warehouse.city,
        warehouse.state,
        warehouse.pin_code,
        warehouse.updated_on,
        warehouse.updated_by,
        warehouse.address_id,
      ]
    );

    message = "warehouse updated successfully";
  }

  return { message };
}

//delete warehouse
async function remove(id) {
  const address_id_result = await db.query(
    `SELECT address_id FROM warehouse WHERE warehouse.id = ?`,
    [id]
  );

  address_id = address_id_result[0].address_id;

  const deletewarehouseResult = await db.query(
    `DELETE FROM warehouse WHERE warehouse.id=?`,
    [id]
  );

  if (deletewarehouseResult.affectedRows) {
    const deleteAddressResult = await db.query(
      `DELETE FROM address WHERE address.id=?`,
      [address_id]
    );

    let message = "Error in deleting Adress";
    if (deleteAddressResult.affectedRows) {
      message = "Address deleted successfully";
    }
  }

  let message = "Error in deleting warehouse";

  //let message = address_id_result[0].address_id;

  if (deletewarehouseResult.affectedRows) {
    message = "warehouse and Address deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readWarehouse,
  readSingleWarehouse
};
