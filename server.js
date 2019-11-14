const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config({ path: './config/config.env'});

const connection = require('./config/db');
const getProgramList = require('./routes/programList');

connection();
const app = express();

app.use('/api/v1/getProgramList', getProgramList);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`The server is running on port ${PORT}` .green.inverse));

// Handle -  unhandled promise rejection error simply crash the app.
process.on('unhandledRejection', (err, promise) => {
    console.log('Error: ', err);
    // close the server
    server.close(() => {
        process.exit(1);
    });
});
