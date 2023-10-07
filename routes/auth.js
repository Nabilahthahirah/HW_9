const express = require("express");
const router = express.Router();
const pool = require("../config/config.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const {verifyToken, genaratedToken} = require("../lib/jwt.js")

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const insertQuery = `
        INSERT INTO users(email, password, role)
            VALUES
                ($1, $2, $3)
    `;

    const result = await pool.query(insertQuery, [email, hashPassword, role]);

    res.status(201).json({
      message: "User Created Succesfully",
      email,
      password,
      role,
    });
  } catch (error) {
    next(error)
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findQuery = `
            SELECT
                *
            FROM users
                WHERE email = $1;
    `;

    const result = await pool.query(findQuery, [email]);
    if(result.rows.length === 0){
        throw {name: "ErrorNotFound"}
    } else {
      const foundUser = result.rows[0]

      // Compare password with hashpassword
      const isValid = bcrypt.compareSync(password, foundUser.password)

      // Check Password Valid
      if(isValid){
        const accessToken = genaratedToken({
          id: foundUser.id,
          email : foundUser.email,
          role : foundUser.role
        });

        res.status(200).json({
          message : "Login Success",
          accessToken,
        })
      } else {
        throw{name: "InvalidCredentials"}
      }
    }
  } catch (error) {
    next(error)
  }
});
module.exports = router;