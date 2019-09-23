const router = require('express').Router();
const { verifyToken } = require('../validator');
const { loginValidation, registerValidation } = require('../joi-schema/joi-validator');
const OfficeUser = require('../mongoose-model/mongoose-office');
const jwt = require('jsonwebtoken');
const bcrypt = require('../index.js').bcrypt;

router.post('/office-login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

    const user = await OfficeUser.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ status: 400, message: 'No User Found' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Password  is  invalid");

    const token = jwt.sign({
        _id: user._id,
        fname: user.fname,
        mobile: user.mobile,
        username: user.username
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

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new OfficeUser({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        mobile: req.body.mobile,
        role: req.body.role,
        password: hashPassword
    });

    try {

        const savedUser = await user.save();
        if (savedUser) return res.status(200).json(savedUser);
    }
    catch (err) {
        return res.status(400).json({ status: 400, message: err })

    }


})


module.exports.office = router;