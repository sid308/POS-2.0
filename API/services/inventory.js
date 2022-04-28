const db = require("./connection");
const helper = require("../helper");
const config = require("../config");

//read all product in stocks
async function readInventory(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT inventory.id, inventory.product_id AS inventory_product_id, inventory.warehouse_id AS warehouse_inventory_id, inventory.stock, inventory.created_on, inventory.created_by, inventory.updated_on, inventory.updated_by,
    product.id AS product_id, product.name AS product_name, product.unit_price, product.hsn_code, product.created_on as product_created_on, product.created_by as product_created_by, product.updated_on , 
    warehouse.id as warehouse_id, warehouse.name AS warehouse_name, warehouse.address_id AS warehouse_address_id, warehouse.amount, warehouse.weight,
    address.id AS address_id, address.address AS warehouse_address, address.city as warehouse_city, address.state as warehouse_state, address.pin_code As warehouse_pin_code, address.created_on AS warehouse_address_created_on, address.created_by AS warehouse_address_created_by, address.updated_on AS warehouse_address_updated_on,address.updated_by AS warehouse_address_updated_by
       FROM warehouse join inventory ON inventory.warehouse_id = warehouse.id
       join product ON inventory.product_id = product.id
       JOIN address ON warehouse.address_id = address.id LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}


//to fetch product in stock of a perticular warehouse
async function readSingleWarehouseinventory(id,page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT inventory.id, inventory.product_id, inventory.warehouse_id, inventory.stock, inventory.created_on, inventory.created_by, inventory.updated_on, inventory.updated_by,
      product.id as product_id, product.name AS product_name, product.unit_price, product.hsn_code, product.created_on as product_created_on, product.created_by as product_created_by, product.updated_on , 
      warehouse.id, warehouse.name AS warehouse_name, warehouse.address_id AS warehouse_address_id, warehouse.amount, warehouse.weight,
      address.id AS address_id, address.address AS warehouse_address, address.city as warehouse_city, address.state as warehouse_state, address.pin_code As warehouse_pin_code, address.created_on AS warehouse_address_created_on, address.created_by AS warehouse_address_created_by, address.updated_on AS warehouse_address_updated_on,address.updated_by AS warehouse_address_updated_by
         FROM warehouse join inventory ON inventory.warehouse_id = warehouse.id
         join product ON inventory.product_id = product.id
         JOIN address ON warehouse.address_id = address.id
         Where warehouse.id = ?  LIMIT ?,?`,
      [id,offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
  
    return {
      data,
      meta,
    };
  }

//create inventory
async function create(inventory) {
  const inventory_result = await db.query(
    `INSERT INTO inventory  
    (product_id, warehouse_id, stock, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      inventory.product_id,
      inventory.warehouse_id,
      inventory.stock,
      inventory.created_on,
      inventory.created_by,
    ]
  );

  let message = "Error in creating inventory ";

  if (inventory_result.affectedRows) {
    message = "inventory created successfully";
  }

  return { message };
}

//update inventory
async function update(id, inventory) {
  const cutomerResult = await db.query(
    `UPDATE inventory 
    SET product_id=?, stock=?,
    warehouse_id = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      inventory.product_id,
      inventory.stock,
      inventory.warehouse_id,
      inventory.updated_on,
      inventory.updated_by,
      id,
    ]
  );



  let message = "Error in updating inventory";

  message = "inventory updated successfully";

  return { message };
}

//delete inventory
async function remove(id) {
  const deleteinventoryResult = await db.query(
    `DELETE FROM inventory WHERE inventory.id=?`,
    [id]
  );

  let message = "Error in deleting inventory";

  if (deleteinventoryResult.affectedRows) {
    message = "inventory deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readInventory,
  readSingleWarehouseinventory
};
