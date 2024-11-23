const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staff = new Schema({
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    staff_no: {type: Number, bcrpt: true},
});

module.exports = mongoose.model('staffs', staff);
