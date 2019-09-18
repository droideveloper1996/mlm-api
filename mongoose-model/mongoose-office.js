const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var OfficeUser = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim: true

    },
    lname: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim: true
    },

    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        trim: true

    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
        min: 6,
    }
})
mongoose.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = mongoose.model('Office', OfficeUser, 'Office');