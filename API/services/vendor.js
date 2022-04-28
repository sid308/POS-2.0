const db = require("./connection");
const helper = require("../helper");
const config = require("../config");

//read vendors
async function readVendor(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT vendor.id, vendor.name, vendor.gst, vendor.email, vendor.phone, vendor.created_on, vendor.created_by, vendor.updated_on, vendor.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by, address.created_on, address.updated_on, address.updated_by, address.id AS address_id FROM vendor inner join address 
    where vendor.address_id = address.id LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}


async function readSingleVendor(id,page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT vendor.id, vendor.name, vendor.gst, vendor.email, vendor.phone, vendor.created_on, vendor.created_by, vendor.updated_on, vendor.updated_by, address.address, address.city, address.state, address.pin_code, address.created_by, address.created_on, address.updated_on, address.updated_by, address.id AS address_id FROM vendor inner join address 
    where vendor.address_id = address.id  AND vendor.id=? LIMIT ?,?`,
    [id,offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//create vendor
async function create(vendor) {
  const address_result = await db.query(
    `INSERT INTO address  
    (address, city, state, pin_code, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      vendor.address,
      vendor.city,
      vendor.state,
      vendor.pin_code,
      vendor.created_on,
      vendor.created_by,
    ]
  );

  address_id = address_result.insertId;

  if (address_result.affectedRows) {
    const vendor_result = await db.query(
      `INSERT INTO vendor  
        (name, gst, email, address_id, phone, created_on, created_by) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)`,
      [
        vendor.name,
        vendor.gst,
        vendor.email,
        address_id,
        vendor.phone,
        vendor.created_on,
        vendor.created_by,
      ]
    );

    let message = "Error in creating vendor";

    if (vendor_result.affectedRows) {
      message = "vendor created successfully";
    }

    return { message };
  }

  let message = "Error in creating address ";

  if (vendor_result.affectedRows) {
    message = "vendor and address created successfully";
  }

  return { message };
}

//update vendor
async function update(id, vendor) {
  const cutomerResult = await db.query(
    `UPDATE vendor 
    SET name=?, phone=?, email=?, gst = ?,
    address_id = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      vendor.name,
      vendor.phone,
      vendor.email,
      vendor.gst,
      vendor.address_id,
      vendor.updated_on,
      vendor.updated_by,
      id,
    ]
  );

  let message = "Error in updating vendor";

  if (cutomerResult.affectedRows) {
    const addressResult = await db.query(
      `UPDATE address 
      SET address=?, city=?, state=?, pin_code = ?,
      updated_on = ?, updated_by = ?
      WHERE id=?`,
      [
        vendor.address,
        vendor.city,
        vendor.state,
        vendor.pin_code,
        vendor.updated_on,
        vendor.updated_by,
        vendor.address_id,
      ]
    );

    message = "vendor updated successfully";
  }

  return { message };
}

//delete vendor
async function remove(id) {
  const address_id_result = await db.query(
    `SELECT address_id FROM vendor WHERE vendor.id = ?`,
    [id]
  );

  address_id = address_id_result[0].address_id;

  const deletevendorResult = await db.query(
    `DELETE FROM vendor WHERE vendor.id=?`,
    [id]
  );

  if (deletevendorResult.affectedRows) {
    const deleteAddressResult = await db.query(
      `DELETE FROM address WHERE address.id=?`,
      [address_id]
    );

    let message = "Error in deleting Adress";
    if (deleteAddressResult.affectedRows) {
      message = "Address deleted successfully";
    }
  }

  let message = "Error in deleting vendor";

  //let message = address_id_result[0].address_id;

  if (deletevendorResult.affectedRows) {
    message = "vendor and Address deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readVendor,
  readSingleVendor
};
