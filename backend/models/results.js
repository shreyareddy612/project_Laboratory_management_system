const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const results = new Schema({
    results: {type: String, required: true},
    test_no: {type: Number, required: true},
    staff: {type: String, required: true},
});

module.exports = mongoose.model('results', results);
