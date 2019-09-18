const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    description: {
        type: String
    },
    contentType: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    img: { data: Buffer, contentType: String }

})

module.exports = mongoose.model('Bucket', fileSchema, 'Bucket');