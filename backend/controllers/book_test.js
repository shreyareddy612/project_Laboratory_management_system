const BkTest = require('../models/book_test.js');


module.exports.createBkTest = async (req, res) => {
    try {
        const totalCount = await BkTest.find({}).count()
        const CreateBooking = await BkTest.create({
            disease: req.body.disease,
            user_email: req.body.user_email,
            booking_no: totalCount + 1
        });
        res.send({ CreateBooking });
    } catch (error) {
        
        res.status(400).send({ error: error });
    }
}

module.exports.getBookedTests = async (req, res) => {
    try {        
        const booked = await BkTest.find({ tested: false});
        res.send({ booked });
    } catch (error) {
        res.status(400).send({ error: error });
    }
}

module.exports.updateBookTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPatient = await BkTest.findOneAndUpdate(
            { _id: id },
            { $set: { tested: true } },
            { new: true }
        );
        if (!updatedPatient) {
            return res.send({ message: "Patient not found" });
        }

        res.status(200).json({ message: 'Updated!!', updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
