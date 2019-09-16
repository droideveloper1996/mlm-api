const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { students } = require('./routes/student');
const { faculty } = require('./routes/faculty');
const { reports } = require('./routes/report');
const { office } = require('./routes/office');

const dotenv = require('dotenv');

dotenv.config();


const PORT = 4000
var app = express();

app.use(express.json());

app.use('/api/student', students)
app.use('/api/faculty', faculty)
app.use('/api/report', reports)
app.use('/api/office', office)

mongoose.connect(process.env.DB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err.message;
    else
        console.log('Connection was Successful');

});
app.get('/', (req, res) => {
    res.status(400).json({ message: 'Access Denied', status: 400 });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
