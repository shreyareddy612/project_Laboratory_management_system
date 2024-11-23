const ContactUs = require("../models/contact_us.js");

// Contact Us
module.exports.contactUs = async (req, res) => {
    try {
        const contactUs = ContactUs.create({
            question: req.body.question,
            details: req.body.details
        });
        res.send({ contactUs });
    } catch (error) {
        res.status(400).send({ error: error });
    }
}

// Get all users
module.exports.getContactUs = async (req, res) => {
    try {
        const qas = await ContactUs.find({});
        res.send({ qas });
    } catch (err) {
        res.status(400).send({err: err});
    }
};
