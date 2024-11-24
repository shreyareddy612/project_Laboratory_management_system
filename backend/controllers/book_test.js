const BkTest = require('../models/book_test.js');
const PDFDocument = require("pdfkit");
const user = require('../models/user.js');

// Create a new booking test
module.exports.createBkTest = async (req, res) => {
    try {
        const totalCount = await BkTest.countDocuments(); // More efficient way to count
        const CreateBooking = await BkTest.create({
            disease: req.body.disease,
            user_email: req.body.user_email,
            booking_no: totalCount + 1,
        });
        res.status(201).json({ CreateBooking }); // Use status 201 for resource creation
    } catch (error) {
        console.error("Error creating booking:", error); // Log error for debugging
        res.status(400).json({ error: error.message || "Failed to create booking" });
    }
};

// Get all booked tests that are not tested
module.exports.getBookedTests = async (req, res) => {
    try {
        console.log(`tested`)
        const booked = await BkTest.find();
        res.status(200).json({ booked });
    } catch (error) {
        console.error("Error fetching booked tests:", error);
        res.status(400).json({ error: error.message || "Failed to retrieve booked tests" });
    }
};
module.exports.generatePDF =async (req, res) => {
    const { id } = req.params;
  try {
    console.log("Request Params:", req.params);

    // Validate ID format
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).send("Invalid Booking ID format.");
    }

    // Find booking in the database
    const booking = await BkTest.findById(id);

    if (!booking) {
      console.error("Booking not found for ID:", id);
      return res.status(404).send("Booking not found.");
    }
    const userdata = await user.findOne({ email: booking.user_email });

        if (!userdata) {
            return res.status(404).send("User not found.");
        }


    // Generate PDF content
    const pdfContent = `
      Lab Report
       Patient Name: ${userdata.full_name}\n
            Patient Email: ${userdata.email}\n
      --------------------
      Test: ${booking.disease}
      Results: ${booking.results}
      Status: ${booking.status}
    `;

    // Initialize PDFKit
    const doc = new PDFDocument();
    let buffers = [];

    // Collect the PDF data in chunks
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Send the PDF as a response with proper headers
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf", // "inline" ensures it opens in the browser
      });
      res.send(pdfBuffer);
    });

    // Add content to the PDF
    doc.text("Lab Report", { align: "center", underline: true });
    doc.moveDown();
    doc.text(`Test: ${booking.disease}`);
    doc.text(`Results: ${booking.results}`);
    doc.text(`Status: ${booking.status}`);
    doc.moveDown();
    doc.text("Thank you for choosing our lab!", { align: "center" });
    doc.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).send("Failed to generate report.");
  }
  };

module.exports.updateBookTestById = async (req, res) => {
    const { id } = req.params;
    const { results, status } = req.body;

    // Validate ID format
    if (!id || id.length !== 24) {
        return res.status(400).json({ message: "Invalid booking ID format" });
    }

    try {
        console.log("Request Body:", req.body);

        // Build the fields to update, inserting defaults where necessary
        const updatedFields = {
            ...(results && { results }), // Include 'results' if provided
            ...(results ? { status: "Completed" } : { status: status || "Pending" }), // Default to "Pending" if 'status' not provided
        };

        console.log("Update Fields:", updatedFields);

        const updatedBooking = await BkTest.findByIdAndUpdate(
            id,
            { $set: updatedFields }, // Use $set to add or update fields
            { new: true, runValidators: true, upsert: false } // Enforce validation and return updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            updatedBooking,
        });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};