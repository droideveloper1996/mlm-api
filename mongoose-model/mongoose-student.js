const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var personalDetail = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        required: true,
        min: 1,
        trim: true
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    motherName: {
        type: String,
        required: true,
        trim: true
    },
    guardianName: {
        type: String,
        required: true,
        trim: true
    },
    guardianRelation: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
});


//mongoose.model('personalDetail ', personalDetail, 'personalDetail ')

var studentRegistrationSchema = new mongoose.Schema({
    studentFirstName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim: true
    },
    studentLastName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim: true
    },
    dateOfAdmission: {
        type: String,
        required: true,
        min: 3,
        max: 10,
        trim: true
    },
    gender: {
        type: String,
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
    studentID: {
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

    dateOfBirth: {
        type: String,
        required: true,
        trim: true
    },

    boardRollNo: {
        type: String,
        required: true,
        trim: true
    },

    wingType: {
        type: String,
        required: true,
        trim: true
    },
    boardType: {
        type: String,
        required: true,
        trim: true
    },
    medium: {
        type: String,
        required: true,
        trim: true
    }
    ,
    personalDetail: {
        category: {
            type: String,
            required: true,
            trim: true
        },
        subCategory: {
            type: String,
            required: true,
            min: 1,
            trim: true
        },
        fatherName: {
            type: String,
            required: true,
            trim: true
        },
        motherName: {
            type: String,
            required: true,
            trim: true
        },
        guardianName: {
            type: String,
            required: true,
            trim: true
        },
        guardianRelation: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },

    },
    primaryMobile: {
        type: Number,
        required: true,
        trim: true
    },
    secondaryMobile: {
        type: Number,
        required: true,
        trim: true
    },
    profilePictureRef: {
        type: String
    },
    signatureRef: {
        type: String
    },
    religion: {
        type: String,
        required: true,
        trim: true
    },
    conveyance: {
        type: String,
        required: true,
        trim: true
    },
    adhaarNumber: {
        type: String,
        required: true,
        trim: true
    },
    disability: {
        type: String,
        required: true,
        trim: true
    },
    admissionType: {
        type: String,
        required: true,
        trim: true
    },
    registeredBy: {
        type: String,
        required: true,
        trim: true
    }



})


mongoose.plugin(timestamps, {
    createdAt: 'created_At',
    updatedAt: 'updated_At'
});

module.exports.studentRegistrationSchema = mongoose.model('Students', studentRegistrationSchema, 'Students');