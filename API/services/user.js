const db = require("./connection");
const helper = require("../helper");
const config = require("../config");
const user = require("../middleware/user");
const { use } = require("../routes/user");


const bcrypt = require('bcryptjs');
//const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/user.js');


//read users
async function readUser(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT user.id, user.name, user.email, user.pass, user.role, user.created_on, user.created_by, user.updated_on, user.updated_by, user.last_login FROM user 
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
//read a customer
async function readSingleUser(id,page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT user.id, user.name, user.email, user.pass, user.role, user.created_on, user.created_by, user.updated_on, user.updated_by , user.last_login FROM user WHERE user.id = ? LIMIT ?,?`,
    [id,offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//create user
async function create(user) {
  const user_result = await db.query(
    `INSERT INTO user  
    (name, email, pass, role, phone, created_on, created_by) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [
      user.name,
      user.email,
      user.pass,
      user.role,
      user.phone,
      user.created_on,
      user.created_by
    ]
  );

  let message = "Error in creating user ";

  if (user_result.affectedRows) {
    message = "user created successfully";
  }

  return { message };
}

//update user
async function update(id, user) {
  const user_result = await db.query(
    `UPDATE user 
    SET name=?, email=?, phone=?,
    role = ?,
    updated_on = ?, updated_by = ?
    WHERE id=?`,
    [
      user.name,
      user.email,
      user.phone,
      user.role,
      user.updated_on,
      user.updated_by,
      id,
    ]
  );

  let message = "Error in updating user";

  if (user_result.affectedRows) {
    message = "user updated successfully";
  }

  return { message };
}

//delete user
async function remove(id) {
  const deleteuserResult = await db.query(
    `DELETE FROM user WHERE user.id=?`,
    [id]
  );

  let message = "Error in deleting user";

  if (deleteuserResult.affectedRows) {
    message = "user deleted successfully";
  }

  return { message };
}

async function login(user){
  const isuserexist = await db.query(
    'SELECT id, name, email, pass, phone, role, created_by, created_on, updated_by, updated_on, last_login from user WHERE email = ?',
    [user.email]
  );
  const data = helper.emptyOrRows(isuserexist);
  //const passwordz = data['pass'];
  let message = "";
    if(!isuserexist.length){
      message = "User Not Found";
      
    }
    else{
      //message = "User Found";
      if(data[0]['pass'] == user.pass)
      {
        message = "authentication";

      const token = jwt.sign({
          email: data[0].email,
          userId: data[0].id
        },
        'SECRETKEY', {
          expiresIn: '7d'
        }
      );

      //update the last login time of user
        db.query(
          `UPDATE user SET last_login = now() WHERE id = ?`,
          [data[0]['id']]
        );
          message = "auth login";

        return { message, data, token}
      }
      else{
        message = " not authen";
        return {message};
      }

    }

    //pass = data[0]['pass'];
    return { message, data };
}

//read users
async function readUsersAddress(userId) {
  // const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM address where customer_id = ?`,
    [userId]
  );
  const data = helper.emptyOrRows(rows);
  // const meta = { page };

  return {
    data
    // meta,
  };
}


module.exports = {
  create,
  update,
  remove,
  readUser,
  readSingleUser,
  login,
};
