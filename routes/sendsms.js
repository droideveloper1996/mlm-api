const router = require('express').Router();
const https = require('https');
const request = require('request');

const apiKey = "+feXLHm1qlI-vG1PlvHlrKPOUwgQJKkt4N8sa8zOP9";
// 			String message = "&message=" + URLEncoder.encode("This is your message", "UTF-8");
const sender = "TXTLCL"
// 			String numbers = "&numbers=" + URLEncoder.encode("918123456789", "UTF-8");

// 			// Send data
//const uri = "https://api.textlocal.in/send/?" + apiKey + numbers + message + sender;
router.get('/sendsms', (req, res) => {

    const mobile = req.body.mobile;
    const message = req.body.message;
    request(`https://api.textlocal.in/send/?apikey=${apiKey}+&numbers=${mobile}+&message=${message}+&sender=${sender}`, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.status(response.statusCode).json({ message: body });
    });


})

router.get('/send-message', (req, res) => {
    const mobile = req.body.mobile;
    const senderID = req.body.senderID;
    const format = 'json';
    const message = req.body.message;
    const username = 'kushwaha.27@gmail.com'
    const password = '00000'
    const reqid = 1

    request(`http://message.xpertgroup.in/API/WebSMS/Http/v1.0a/index.php?to=${mobile}&message=${message}&sender=${senderID}&format=${format}&username=${username}&password=${password}&reqid=${reqid}`, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', JSON.stringify(body));
        res.status(response.statusCode).json(JSON.parse(body));
    });

})

module.exports.sms = router;