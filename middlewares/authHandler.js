const { verifyToken } = require("../lib/jwt.js");
const pool = require("../config/config.js");

const authentication = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
        throw { name: "Unauthenticated" };
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    // Decoded token
    const { email, role } = verifyToken(accessToken);
    const findQuery = `
            SELECT
                *
            FROM users
                WHERE email = $1;
        `;

    const result = await pool.query(findQuery, [email]);
    if (result.rows.length === 0) {
      throw { name: "Unauthenticated" };
    } else {
      //Terauthentication
      const foundUser = result.rows[0];

      //Coustom property loggedUser
      req.loggedUser = {
        email: foundUser.email,
        role: foundUser.role,
      };

      //Lanjut ke middleware
      next();
    }
  } catch (error) {
    next(error);
  }
};

const authorization = (req, res, next) => {
  // Execute Setelah Authentication
  try {
    const{role} = req.loggedUser;

    if(role ==="admin"){
      next();
    } else {
      throw {name :"Unauthorized"}
    }
  } catch (err) {
    next(err)
  }

};

module.exports = {
  authentication,
  authorization,
};
