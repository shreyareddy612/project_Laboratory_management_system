const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
    {
        testName: { type: String, required: true },
      labName: { type: String, required: true }, // Add labName field here
    },
    { timestamps: true }
  )

const Test = mongoose.model('Test', testSchema);

module.exports = Test;