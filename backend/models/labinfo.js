const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labinfo = new Schema({
    name: {type: String, required: true},
    contacts: {type: String, required: true},
    location: {type: String, required: true},
});

module.exports = mongoose.model("labinfo", labinfo);
