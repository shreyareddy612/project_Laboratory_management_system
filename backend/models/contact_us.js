const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactus = new Schema({
    question: {type: String, required: true},
    details: {type: String, required: true},
});

module.exports = mongoose.model("contactus", contactus);
