'use strict';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.APP_URL }));
app.use(express.json());


// ROUTES
require('./routes')(app);
// END OF ROUTES


const PORT = process.env.NODE_PORT || 8000;
app.set('port', PORT);

app.listen(PORT, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on *:${PORT}`);
});

module.exports = app;