const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('Report Route OK')
});

module.exports.reports = router;