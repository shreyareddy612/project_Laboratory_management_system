const express = require('express');
const app = express();

const mongoose = require("mongoose");

const uri = "mongodb+srv://shreya:jukareddy123@cluster0.he6riu6.mongodb.net/"
mongoose.connect(uri).then(
    () => {console.log("Success");},
    err => {console.log(err);}
);

app.listen(3000, () => {
    console.log("Server is running");
})
