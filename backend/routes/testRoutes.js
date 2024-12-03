

const express = require('express');
const router = express.Router();



const { createTest, getAllTests, getTestById, updateTest,deleteTest} = require('../controllers/test.js');

router.post('/tests', createTest);
router.get('/tests', getAllTests);
router.get('/tests/:id', getTestById);
router.put('/tests/:id', updateTest);
router.delete('/tests/:id', deleteTest);


module.exports = router;
