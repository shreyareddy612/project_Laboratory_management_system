const express = require('express');

const labinfoRouter = express.Router();

const LabInfo = require('../models/labinfo')

// @route   GET /api/labs/
// @desc    Get all labs
// @access  Public
labinfoRouter.get('/', async (req, res) => {
    try {
        const labs = await LabInfo.find({});
        res.send({ labs });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// @route   GET /api/labs/id
// @desc    Get lab by id
// @access  Public
labinfoRouter.get('/:id', async (req, res) => {
    try {
        const lab = await LabInfo.findById(req.params.id);
        res.send({ lab });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// @route   POST /api/labs/
// @desc    Create new laboratory
// @access  Private (Staff)
labinfoRouter.post('/', async (req, res) => {
    try {
        const newLab = await LabInfo.create({
            name: req.body.name,
            contacts: req.body.contacts,
            location: req.body.location
        });
        res.status(200).send({ message: "successfully added new lab" });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// @route   PUT /api/labs/id
// @desc    Update Lab information by id
// @access  Private (Staff)
labinfoRouter.put('/:id', async (req, res) => {
    try {
        const updateLabInfo = await LabInfo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Updated Lab Info" });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// @route   DELETE /api/labs/id
// @desc    Delete Lab Info by id
// @access  Private (Staff)
labinfoRouter.delete('/:id', async (req, res) => {
    try {
        const deleteLab = await LabInfo.findByIdAndRemove(req.params.id);
        res.status(200).send({ message: "Successfully Deleted" });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

module.exports = labinfoRouter;
