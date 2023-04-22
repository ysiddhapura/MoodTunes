const express = require("express");
const test = require("./test.js");

const router = express.Router();

router.route('/test').get(test.gettest);

module.exports = router