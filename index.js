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
const { fees } = require('./routes/fee');
const admin = require("firebase-admin");
const file = require('./routes/handle-files')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs-extra');
const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId
module.exports.bcrypt = bcrypt;


dotenv.config();
const PORT = process.env.PORT || 4000
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Expose-Headers', 'auth-token');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();

});


app.use(express.json());
app.use('/api/student', students)
app.use('/api/faculty', faculty)
app.use('/api/report', reports)
app.use('/api/office', office)
app.use('/api/fee', fees)
app.use('/api/file', file)


mongoose.connect(process.env.DB_CONNECT_URL_PRODUCTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err.message;
    else
        console.log('Connection was Successful');

});
// app.get('/', (req, res) => {
//     res.status(400).json({ message: 'Access Denied', status: 400 });
// })

app.post('/upload', upload.single('image'), async (req, res, next) => {
    if (req.file == null) {
        return res.status(400).json({ status: 400, message: 'Please select a picture file to submit!' });
    }
    else {
        MongoClient.connect(process.env.DB_CONNECT_URL_PRODUCTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            var newImg = fs.readFileSync(req.file.path);
            var encImg = newImg.toString('base64');
            var newItem = {
                description: req.body.description,
                contentType: req.file.mimetype,
                size: req.file.size,
                img: Buffer(encImg, 'base64')
            };
            try {
                const db = client.db('Production');
                db.collection('Bucket')
                    .insert(newItem, function (err, result) {
                        if (err) { console.log(err); return res.status(400).json({ message: err }); };

                        var _id = new ObjectId(result.ops[0]._id);
                        console.log(_id)
                        fs.remove(req.file.path, function (err) {
                            return res.status(200).json({ message: 'Thanks for the Picture!', _id: _id, status: 200 });
                        });
                    });
            } catch (err) {
                return res.status(400).json({ message: 'Error Occured ' + err, status: 400 });
            }
        });
    };
});
app.get('/getImage/:picture', function (req, res) {
    var filename = req.params.picture;
    MongoClient.connect(process.env.DB_CONNECT_URL_PRODUCTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        const db = client.db('Production');
        db.collection('Bucket')
            .findOne({ '_id': ObjectId(filename) }, function (err, results) {
                if (err) return res.send('Error Occured!!')
                res.setHeader('content-type', results.contentType);
                res.send(results.img.buffer);
            });
    });
});

app.post('/test-route', (req, res) => {
    headers = req.header('authorization')
    res.status(200).json({ res: req.body, header: headers })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
