const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    designation: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model("users", user);
