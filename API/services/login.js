const db = require("./connection");
const helper = require("../helper");
const config = require("../config");
const jwt = require('jsonwebtoken');


const accessTokenSecret = 'youraccesstokensecret';

//read a customer
async function login(login_user, page=1 ) {
    let message = "in login"
    const offset = helper.getOffset(page, config.listPerPage);
    const users = await db.query(
      `SELECT user.id, user.name, user.phone, user.pass, user.email, user.role, user.created_on, user.created_by, user.updated_on, user.updated_by FROM user LIMIT ?,?`,
      [offset, config.listPerPage]
    );

    //const data = helper.emptyOrRows(users);
    const meta = { page };

    const { username, password } = login_user;
    
    const user = users.find(u => { return u.email === username && u.pass === password });

    const data = user;
    //const accessToken;

    if (user) {
        // Generate an access token
         accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
         message = "Succesfully login";
       
    } else {
        accessToken = "";
         message = "Username or password incorrect";
       // res.send('Username or password incorrect');
    }

    return {
        message,
        accessToken,
      data,
      meta,
    };

    

  }

module.exports = {
  login
};
