const express = require('express');
const jwt = require('jsonwebtoken');

const Staff = require('../models/staff');


// register user
module.exports.registerStaff = async (req, res) => {
    try {
        const newStaff = await Staff.create({
            full_name: req.body.full_name,
            email: req.body.email,
            staff_no: req.body.staff_no
        });
        res.send({ newStaff });
    } catch (error) {
        res.status(400).send({ error: error });
    }
}

module.exports.loginStaff = async (req, res) => {
    try {
        const { email, staff_no } = req.body;

        const staff = await Staff.findOne({ email, staff_no })
        if (!staff) {
          res.status(401).json({
            message: "Login not successful",
            error: "Staff not found",
          })
        } else {
          res.status(200).json({
            message: "Login successful",
            staff,
          })

          // If the email and staff no match, generate a JWT
          const token = jwt.sign({ _id: staff._id }, process.env.JWT_SECRET);

          // Save the JWT in a cookie and return a success message
          res.cookie('jwt', token, { httpOnly: true });
          res.json({ message: 'Logged in successfully' });
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
};


// // @route   GET /api/staffs/
// // @desc    Get all staffs
// // @access  Public
// staffRouter.get('/', async (req, res) => {
//     try {
//         const staffs = await Staff.find({})
//         res.send({ staffs });
//     } catch (error) {
//         res.status(400).send({error: error});
//     }
// });


// // @route   GET /api/staffs/:id
// // @desc    Get a staff by id
// // @access  Public
// staffRouter.get('/:id', async (req, res) => {
//     try {
//         const staff = await Staff.findById(req.params.id);
//         res.send({ staff })
//     } catch (error) {
//         res.status(400).send({ error: error });
//     }
// });

// // @route   POST /api/staffs/
// // @desc    Create a new staff
// // @access  Public
// staffRouter.post('/', async (req, res) => {
//     try {
//         const newStaff = await Staff.create({
//             full_name: req.body.full_name,
//             email: req.body.email,
//             staff: req.body.email
//         });
//         res.send({ newStaff });
//     } catch (error) {
//         res.status(400).send({ error: error });
//     }
// });

// // @route   PUT /api/staffs/:id
// // @desc    update the staffs
// // @access  public
// staffRouter.put('/:id', async (req, res) => {
//     try {
//         const updateStaff = await Staff.findByIdAndUpdate(req.params.id, req.body);
//         res.send({ message: 'The Staff was updated' });
//     } catch (error) {
//         res.status(400).send({ error: error });
//     }
// });

// // @route   DELETE /api/staffs/:id
// // @desc    delete a staff
// // @access  Public
// staffRouter.delete('/:id', async (req, res) => {
//     try {
//         const removeStaff = await Staff.findByIdAndRemove(req.params.id);
//         res.send({ message: 'The user was removed' });
//     } catch (error) {
//         res.status(400).send({ error: error });
//     }
// });
