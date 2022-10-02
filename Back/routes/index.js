const express = require("express");
const router = express.Router();
const User = require("./user");
const Admin = require("./admin");
const Report = require("./reports");

router.use("/user", User);
router.use("/admin", Admin);
router.use("/report", Report);

module.exports = router;
