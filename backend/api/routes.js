const express = require("express");
const test = require("./test.js");
const moodtunes = require("./moodtunes.js");
const router = express.Router();

router.route('/test').get(test.gettest);

router.route('/mood').get(moodtunes.getSongsbyMood);

module.exports = router