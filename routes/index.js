const express = require("express");
const router = express.Router();
const authRouter = require("./auth.js");
const movieRouter = require("./movie.js")
const {authentication} = require("../middlewares/authHandler.js");

router.use("/auth",authRouter);
router.use(authentication);

//Kena auth
router.use("/movies", movieRouter);

module.exports = router;