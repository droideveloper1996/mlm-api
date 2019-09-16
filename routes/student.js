const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('Student Route OK')
});

module.exports.students = router;