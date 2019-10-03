const Joi = require('@hapi/joi');


const studentRegistrationValiation = (data) => {

    const personalDetail = Joi.object().keys({
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
        fatherName: Joi.string().required(),
        motherName: Joi.string().required(),
        guardianName: Joi.string().required(),
        guardianRelation: Joi.string().required(),
        address: Joi.string().required(),

    }).required();

    const schema = Joi.object({
        studentFirstName: Joi.string().required(),
        studentLastName: Joi.string().required(),
        dateOfAdmission: Joi.string().required(),
        gender: Joi.string().required(),
        password: Joi.string().required(),
        studentID: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        boardRollNo: Joi.string().required(),
        wingType: Joi.string().required(),
        boardType: Joi.string().required(),
        primaryMobile: Joi.number().required(),
        secondaryMobile: Joi.number().required(),
        personalDetail: personalDetail,
        medium: Joi.string().required(),
        profilePictureRef: Joi.string().required(),
        signatureRef: Joi.string().required(),
        religion: Joi.string().required(),
        conveyance: Joi.string().required(),
        adhaarNumber: Joi.string().required(),
        admissionType: Joi.string().required(),
        disability: Joi.string().required(),
        registeredBy: Joi.string().required(),
        class: Joi.string().required(),
        section: Joi.string().required(),

    });

    return schema.validate(data);

}

module.exports.studentRegistrationValiation = studentRegistrationValiation; 