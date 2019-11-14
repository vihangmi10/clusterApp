const express = require('express');
const router = express.Router();
const getProgramList = require('../controller/programListingDetails');
router.route('/')
    .get(getProgramList);

module.exports = router;
