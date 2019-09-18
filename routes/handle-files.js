const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs-extra');
const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId

router.post('/upload', upload.single('image'), async (req, res, next) => {
    if (req.file == null) {
        res.send({ title: 'Please select a picture file to submit!' });
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
            const db = client.db('Production');
            db.collection('Bucket')
                .insert(newItem, function (err, result) {
                    if (err) { console.log(err); };
                    var _id = new ObjectId(result.ops[0]._id);
                    console.log(_id)
                    fs.remove(req.file.path, function (err) {
                        res.send({ title: 'Thanks for the Picture!' });
                    });
                });
        });
    };
});


router.get('/getImage/:picture', function (req, res) {
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

 
module.exports = router;
module.exports.file = upload;