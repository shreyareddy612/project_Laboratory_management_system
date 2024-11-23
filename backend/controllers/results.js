const Results = require("../models/results.js");

module.exports.createResults = async (req, res) => {
    try {
        const { results, test_no, staff } = req.body;

        // Ensure all required fields are provided
        if (!results || !test_no || !staff) {
            return res.status(400).send({ error: "All fields (results, test_no, staff) are required." });
        }

        // Create new results entry
        const newResults = await Results.create({ results, test_no, staff });
        res.status(201).send({ message: "Results created successfully", data: newResults });
    } catch (error) {
        console.error("Error creating results:", error);
        res.status(500).send({ error: "Failed to create results. Please try again later." });
    }
};

module.exports.allPatients = async (req, res) => {
    try {
        // Fetch all patient records
        const patients = await Results.find({});
        res.status(200).send({ message: "Patients retrieved successfully", data: patients });
    } catch (error) {
        console.error("Error fetching all patients:", error);
        res.status(500).send({ error: "Failed to fetch patients. Please try again later." });
    }
};

module.exports.filteredPatients = async (req, res) => {
    try {
        // Retrieve filter criteria from route parameters or query
        const { filter } = req.params; // Or req.query if using query parameters

        if (!filter) {
            return res.status(400).send({ error: "Filter criteria is required." });
        }

        // Fetch patients based on the provided filter
        const patients = await Results.find({ results: filter });
        res.status(200).send({ message: `Patients with results: ${filter} retrieved successfully`, data: patients });
    } catch (error) {
        console.error("Error fetching filtered patients:", error);
        res.status(500).send({ error: "Failed to fetch filtered patients. Please try again later." });
    }
};