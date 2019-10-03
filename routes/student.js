const router = require('express').Router();
const { studentRegistrationValiation } = require('../joi-schema/joi-student-validation')
const { studentRegistrationSchema } = require('../mongoose-model/mongoose-student')
const bcrypt = require('../index.js').bcrypt;

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

    //const salt = await bcrypt.genSalt(10);
    // const  = await bcrypt.hash(req.body.password, salt);
    /// var salt = await bcrypt.genSaltSync(10);
    // var hashPassword = bcrypt.hashSync(req.body.password, salt);
    const studentObject = new studentRegistrationSchema({
        studentFirstName: req.body.studentFirstName,
        studentLastName: req.body.studentLastName,
        dateOfAdmission: req.body.dateOfAdmission,
        gender: req.body.gender,
        password: req.body.password,
        studentID: req.body.studentID,
        dateOfBirth: req.body.dateOfBirth,
        boardRollNo: req.body.boardRollNo,
        wingType: req.body.wingType,
        boardType: req.body.boardType,
        primaryMobile: req.body.primaryMobile,
        secondaryMobile: req.body.secondaryMobile,
        personalDetail: req.body.personalDetail,
        medium: req.body.medium,
        religion: req.body.religion,
        profilePictureRef: req.body.profilePictureRef,
        signatureRef: req.body.signatureRef,
        conveyance: req.body.conveyance,
        adhaarNumber: req.body.adhaarNumber,
        admissionType: req.body.admissionType,
        disability: req.body.disability,
        registeredBy: req.body.registeredBy,
        class: req.body.class,
        section: req.body.section
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



module.exports.students = router;
