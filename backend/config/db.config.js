const mongoose = require("mongoose");

const uri = "mongodb+srv://shreya:jukareddy123@cluster0.he6riu6.mongodb.net/"

// Allow Promises
mongoose.Promise = global.Promise;
// Connection
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true  });
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));
