const express = require('express');

const router = express.Router();

const { contactUs } = require("../controllers/contact_us.js");

router.post('/contactUs', contactUs);

module.exports = router;
