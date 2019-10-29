const mongoose = require('mongoose');
const Timestamps = require('mongoose-timestamp')

const StudentFeeSummary = new mongoose.Schema({
    studentReceiptNo: {
        type: String,
    },
    studentPaid: {
        type: Number,
    },
    previousBalance: {
        type: Number,
    },
    studentTotalAmountDue: {
        type: Number,
    },
    studentPaymentToward: {
        type: String,
    },
    studentCurrentCharge: {
        type: Number,
    },
    updatedBalance: {
        type: Number,
    }

});

const StudentFee = new mongoose.Schema({

    studentName: {
        type: String,
        require: true,
        minlength: 6,
    },
    studentID: {
        type: String,
        required: true,
        minlength: 6
    },
    studentFeeReport: [StudentFeeSummary],
});

module.exports.StudentFee = mongoose.model('StudentFee', StudentFee, 'StudentFee');