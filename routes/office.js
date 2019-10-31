const router = require('express').Router();
const { verifyToken } = require('../validator');
const { loginValidation, registerValidation } = require('../joi-schema/joi-validator');
const OfficeUser = require('../mongoose-model/mongoose-office');
const { studentRegistrationSchema } = require('../mongoose-model/mongoose-student');
const jwt = require('jsonwebtoken');
const { StudentFee } = require('../mongoose-model/fee-model')
const bcrypt = require('../index.js').bcrypt;

router.post('/office-login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

    const user = await OfficeUser.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ status: 400, message: 'No User Found' });

    // const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (req.body.password != user.password)
        return res.status(400).send({ status: 400, message: "Password  is  invalid" });

    const token = jwt.sign({
        _id: user._id,
        fname: user.fname,
        mobile: user.mobile,
        username: user.username,
        role: user.role
    }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

    return res.status(200).header('auth-token', token).json({ status: 200, message: 'Logged In', token: token })

})

router.post('/office-register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

    const matchedId = await OfficeUser.findOne({ username: req.body.username });
    if (matchedId) return res.status(400).json({ status: 400, message: 'User Id Already Registered' });

    const matchedMobile = await OfficeUser.findOne({ mobile: req.body.mobile });
    if (matchedMobile) return res.status(400).json({ status: 200, message: 'Mobile Already Registered' });

    //const salt = await bcrypt.genSalt(10);
    //const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new OfficeUser({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        mobile: req.body.mobile,
        role: req.body.role,
        password: req.body.password
    });

    try {

        const savedUser = await user.save();
        if (savedUser) return res.status(200).json(savedUser);
    }
    catch (err) {
        return res.status(400).json({ status: 400, message: err })

    }
})

router.get('/getAllStudents', verifyToken, async (req, res) => {
    console.log(req)
    try {
        const stud = await studentRegistrationSchema.find({});
        if (!stud) {
            return res.status(400).json({ message: "No Student Found", status: 400 })
        }
        else {
            return res.status(200).json(stud)
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message, status: 400 })
    }
});

router.get('/getStudentById', verifyToken, async (req, res) => {
    try {
        const id = req.query.studentID;
        if (id == null || id == '') return res.status(400).json({ message: "Student Id/Scholar Number must be provided", status: 400 })
        const student = await studentRegistrationSchema.findOne({ studentID: id });
        if (!student) return res.status(400).json({ message: "No Such Student Exists", status: 400 })
        else return res.status(200).json(student)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
});

router.get('/getStudentByBoard', verifyToken, async (req, res) => {
    try {
        const boardType = req.body.boardType;
        if (boardType == null || boardType == '') return res.status(400).json({ message: "Specify Board", status: 400 })
        const students = await studentRegistrationSchema.findOne({ boardType: boardType });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});

router.get('/getStudentByMedium', verifyToken, async (req, res) => {
    try {
        const medium = req.body.medium;
        if (medium == null || medium == '') return res.status(400).json({ message: "Specify Medium", status: 400 })
        const students = await studentRegistrationSchema.findOne({ medium: medium });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});

router.get('/getStudentByWing', verifyToken, async (req, res) => {
    try {
        const wingType = req.body.wingType;
        if (wingType == null || wingType == '') return res.status(400).json({ message: "Specify Wing", status: 400 })
        const students = await studentRegistrationSchema.findOne({ wingType: wingType });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});

router.get('/getStudentByGender', verifyToken, async (req, res) => {
    try {
        const gender = req.body.gender;
        if (gender == null || gender == '') return res.status(400).json({ message: "Specify Gender", status: 400 })
        const students = await studentRegistrationSchema.findOne({ gender: gender });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});
router.get('/getStudentByConveyance', verifyToken, async (req, res) => {

    try {
        const conveyance = req.body.conveyance;
        if (conveyance == null || conveyance == '') return res.status(400).json({ message: "Specify Conveyance", status: 400 })
        const students = await studentRegistrationSchema.findOne({ conveyance: conveyance });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});
router.get('/getStudentByDisability', verifyToken, async (req, res) => {

    try {
        const disability = req.body.disability;
        if (disability == null || disability == '') return res.status(400).json({ message: "Specify Disability", status: 400 })
        const students = await studentRegistrationSchema.findOne({ disability: disability });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});
router.get('/getStudentByAdmissionType', verifyToken, async (req, res) => {

    try {
        const admissionType = req.body.admissionType;
        if (admissionType == null || admissionType == '') return res.status(400).json({ message: "Specify Admission Type", status: 400 })
        const students = await studentRegistrationSchema.findOne({ admissionType: admissionType });
        if (!students) return res.status(400).json({ message: "No Results Found ", status: 400 })
        else return res.status(200).json(students)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }

});
router.get('/pendingFee', verifyToken, (req, res) => {



})

router.post('/isFirstTimeDeposit', async (req, res) => {

    const studentID = req.body.studentID;
    const student = await StudentFee.findOne({ studentID: studentID })
    if (!student) {
        return res.status(200).json({ status: 200, message: 'Student Not Found', isFirstTimeDeposit: true, student: {} })
    }
    else {
        return res.status(200).json({ status: 200, message: 'Student Found ', isFirstTimeDeposit: false, student: student })
    }
})

router.post('/depositFee', async (req, res) => {
    const studentMobile = req.body.mobile
    const studentID = req.body.studentID;
    const paidAmount = req.body.paidAmount;
    const previousBalance = req.body.previousBalance;
    const currentCharge = req.body.currentCharge;
    if (studentID == null || studentID == '') return res.status(400).json({ message: "Student ID cannot be empty", status: 400 })
    //outstand=previousBal+CurrentCharge
    var student = await StudentFee.findOne({ studentID: studentID })
    if (!student) {
        console.log('No Student Found')
        outstandingDue = currentCharge + previousBalance
        var feePayload = {
            studentReceiptNo: `${req.body.branchCode}/${req.body.studentID}/${Date.now()}`,
            studentPaid: paidAmount,
            studentCurrentCharge: currentCharge,
            studentTotalAmountDue: outstandingDue,
            studentPaymentToward: req.body.toward,
            previousBalance: previousBalance,
            updatedBalance: outstandingDue - paidAmount,
        }
        var payload = {
            studentID: studentID,
            studentName: req.body.studentName,
            studentFeeReport: [feePayload],
        }
        var stu = new StudentFee(payload)
        const savedUser = await stu.save();
        if (savedUser) return res.status(200).json(savedUser)
    }
    else {
        var feeList = student.studentFeeReport;
        _previousBalance = (feeList[feeList.length - 1]).updatedBalance
        outstandingDue = currentCharge + _previousBalance
        console.log(`Outstanding Due ${outstandingDue}`)
        console.log(`Previous Balance Due ${_previousBalance}`)

        var feePayload = {
            studentReceiptNo: `${req.body.branchCode}/${req.body.studentID}/${Date.now()}`,
            studentPaid: paidAmount,
            studentCurrentCharge: currentCharge,
            studentTotalAmountDue: outstandingDue,
            studentPaymentToward: req.body.toward,
            previousBalance: _previousBalance,
            updatedBalance: outstandingDue - paidAmount
        }
        student.studentFeeReport.push(feePayload)
        const result = await student.save();
        return res.status(200).json(result)
    }
})


router.post('/updateStudent', async (req, res) => {

    const studentId = req.body.studentID;
    const update = req.body.update
    const query = { studentID: studentId };
    const options = { new: true };

    if (studentId == '' || studentId == null) return res.status(400).json({ status: 400, message: "Required Student ID" })
    const student = await studentRegistrationSchema.findOne({ studentID: studentId });
    if (!student) return res.status(400).json({ status: 400, message: "Student ID invalid " })

    var updatedStudent = await studentRegistrationSchema.findOneAndUpdate(query, update, options)

    if (updatedStudent) { return res.status(200).json({ status: 200, message: "Student Updated", student: updatedStudent }) }
    else { return res.status(400).json({ status: 400, message: 'Student Could Not be updated' }) }


})


router.post('/markClassAttendence', (req, res) => {

})

module.exports.office = router;
