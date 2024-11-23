const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require('cookie-parser');
const contact_us = require('./routes/route_contact_us.js');
require('./config/db.config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookie());

// routes
app.use('/api/user/', require('./routes/route_user.js'));
app.use('/api/labinfo/', require('./routes/route_labinfo.js'));
app.use('/api/staff/', require('./routes/route_staff.js'));
app.use('/api/bktest/', require('./routes/route_bk_test.js'));
app.use('/api/contact-us/', contact_us);
app.use('/api/results/', require('./routes/results_route.js'));
app.use('/api/profile', require('./routes/route_profile.js'));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
