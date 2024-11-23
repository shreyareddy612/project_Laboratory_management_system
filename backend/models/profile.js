const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profile = new Schema({
    description: {type: String, default: "N/A"},
    sex: {type: String, default: "Prefer Not to Say"},
    disabled: {type: String, default: "No"},
    marital_status: {type: String, required: true, default: "N/A"},
    children: {type: Number, default: 0},
    blood_group: {type: String, default: "N/A"},
    work_at: {type: String, required: true, default: "N/A"},
    work: {type: String, required: true, default: "N/A"},
    next_of_kin: {type: String, required: true, default: "N/A"},
    next_of_kin_rel: {type: String, required: true, default: "N/A"},
    next_of_kin_contact: {type: String, default: "N/A"},
    user_id: {type: String, required: true, default: "N/A"}
});

module.exports = mongoose.model("profile", profile);
