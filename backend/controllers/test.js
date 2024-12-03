const Test = require('../models/Test'); // Adjust the path if necessary

// Create a new test
// module.exports.createTest = async (req, res) => {
//   try {
//     const { testName, description } = req.body;

//     // Validate input
//     if (!testName || !description) {
//       return res.status(400).send({ message: 'testName and description are required.' });
//     }
// console.log(`itle and description are required.`)
//     const test = new Test({ testName, description });
//     await test.save();

//     res.status(201).send({ message: 'Test created successfully', test });
//   } catch (error) {
//     console.error('Error creating test:', error);
//     res.status(500).send({ message: 'Internal server error' });
//   }
// };

module.exports.createTest = async (req, res) => {
   
  
    try {
        const { testName, labName } = req.body;
    
        // Validate input
        if (!testName  || !labName) {
          return res.status(400).send({ message: 'testName,  and laboratory name are required.' });
        }
    
        const test = new Test({ testName, labName });
        await test.save();
    
        res.status(201).send({ message: 'Test created successfully', test });
      } catch (error) {
        console.error('Error creating test:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
  };

// Get all tests
module.exports.getAllTests = async (req, res) => {
  try {
    console.log(`tests`)
    const tests = await Test.find();
    res.status(200).send({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Get a single test by ID
module.exports.getTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).send({ message: 'Test not found' });
    }

    res.status(200).send({ test });
  } catch (error) {
    console.error('Error fetching test by ID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Update a test by ID
module.exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { testName, labName } = req.body;
    
        // Validate input
        if (!testName  && !labName) {
          return res.status(400).send({ message: 'At least one field (testName, or labName) must be provided for update.' });
        }
    
        const updatedTest = await Test.findByIdAndUpdate(
          id,
          { testName, labName }, // Include labName in update
          { new: true, runValidators: true }
        );
    
        if (!updatedTest) {
          return res.status(404).send({ message: 'Test not found' });
        }
    
        res.status(200).send({ message: 'Test updated successfully', test: updatedTest });
      } catch (error) {
        console.error('Error updating test:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
};


// Delete a test by ID
module.exports.deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).send({ message: 'Test not found' });
    }

    res.status(200).send({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

