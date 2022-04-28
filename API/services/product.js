const db = require("./connection");
const helper = require("../helper");
const config = require("../config");

//read products
async function readProduct(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT product.id, product.name, product.unit_price, product.hsn_code, product.created_on, product.created_by, product.updated_on, product.updated_by FROM product 
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

//create product
async function create(product) {
  const product_result = await db.query(
    `INSERT INTO product  
    (name, unit_price, hsn_code, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      product.name,
      product.unit_price,
      product.hsn_code,
      product.created_on,
      product.created_by,
    ]
  );

  let message = "Error in creating product ";

  if (product_result.affectedRows) {
    message = "product created successfully";
  }

  return { message };
}

//update product
async function update(id, product) {
  const cutomerResult = await db.query(
    `UPDATE product 
    SET name=?, unit_price=?, hsn_code=?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      product.name,
      product.unit_price,
      product.hsn_code,
      product.updated_on,
      product.updated_by,
      id,
    ]
  );

  let message = "Error in updating product";

  message = "product updated successfully";

  return { message };
}

//delete product
async function remove(id) {
  const deleteproductResult = await db.query(
    `DELETE FROM product WHERE product.id=?`,
    [id]
  );

  let message = "Error in deleting product";

  if (deleteproductResult.affectedRows) {
    message = "product deleted successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  remove,
  readProduct,
};
