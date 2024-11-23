const express = require('express');
const profileRouter = express.Router();

const { createProfile, getProfileById, updateProfile } = require("../controllers/profile.js");

profileRouter.post('/createProfile/:user_id', createProfile);
profileRouter.get('/getProfileById/:user_id', getProfileById);
profileRouter.put('/updateProfile/:user_id', updateProfile);


module.exports = profileRouter;
