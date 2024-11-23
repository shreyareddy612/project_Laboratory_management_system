const express = require('express');
const router = express.Router();

const { createResults, allPatients, filteredPatients } = require('../controllers/results.js');

router.post('/createResults', createResults);
router.get('/allPatients', allPatients);
router.get('/filteredPatients/:results', filteredPatients);

module.exports = router;
