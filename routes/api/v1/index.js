const express = require("express");
const router = express.Router();



// handling requests
router.use("/products", require("./products"));



module.exports = router;