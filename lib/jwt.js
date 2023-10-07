const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const secretKey = process.env.JWT_SECRET_KEY

const genaratedToken = (payload) =>{
    return jwt.sign(payload, secretKey);
}

const verifyToken = (payload) =>{
    return jwt.verify(payload, secretKey)
}

module.exports ={
    genaratedToken,
    verifyToken
}