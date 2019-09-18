const router = require('express').Router();
const { studentRegistrationValiation } = require('../joi-schema/joi-student-validation')
const { studentRegistrationSchema } = require('../mongoose-model/mongoose-student')
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs-extra');
const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId


router.get('/', (req, res) => {
    res.status(200).send('Student Route OK')
});


router.post('/register-student', upload.single('image'), async (req, res) => {

    var picture_id;
    const { error } = studentRegistrationValiation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 400 });

    const findStudentID = await studentRegistrationSchema.findOne({ studentID: req.body.studentID })
    if (findStudentID) return res.status(400).send({ message: 'Student ID/Scholar No. Already Registered', status: 400 })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    // if (req.file == null) {
    //     return res.send({ status: 400, message: 'Please select a picture file to submit!' });
    // }
    // else {
    //     var newImg = fs.readFileSync(req.file.path);
    //     var encImg = newImg.toString('base64');
    //     var newItem = {
    //         description: req.body.description,
    //         contentType: req.file.mimetype,
    //         size: req.file.size,
    //         img: Buffer(encImg, 'base64')
    //     };
    //     picture_id = uploadImage(newItem)
    // }
    const studentObject = new studentRegistrationSchema({
        studentFirstName: req.body.studentFirstName,
        studentLastName: req.body.studentLastName,
        dateOfAdmission: req.body.dateOfAdmission,
        gender: req.body.gender,
        password: hashPassword,
        studentID: req.body.studentID,
        dateOfBirth: req.body.dateOfBirth,
        boardRollNo: req.body.boardRollNo,
        wingType: req.body.wingType,
        boardType: req.body.boardType,
        primaryMobile: req.body.primaryMobile,
        secondaryMobile: req.body.secondaryMobile,
        personalDetail: req.body.personalDetail,
        medium: req.body.medium,
        profilePictureRef: picture_id
    });

    try {
        const newStudent = await studentObject.save();
        if (newStudent) return res.status(200).json(newStudent);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 400
        });
    }

});


const uploadImage = (newItem) => {
    MongoClient.connect(process.env.DB_CONNECT_URL_PRODUCTION, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

        const db = client.db('Production');
        db.collection('Bucket')
            .insert(newItem, function (err, result) {
                if (err) { console.log(err); };
                var _id = new ObjectId(result.ops[0]._id);
                fs.remove(req.file.path, function (err) {
                    return (result.ops[0]._id);
                });
            });
    });
}

module.exports.students = router;
