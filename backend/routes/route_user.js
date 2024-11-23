const express = require("express");
const router = express.Router();

const { 
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserByEmail,
    getStaffs
 } = require("../controllers/user.js");

router.post('/registerUser/', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.get('/getStaffs', getStaffs);

module.exports = router;

