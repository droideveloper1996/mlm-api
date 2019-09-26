const Joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    });

    return schema.validate(data);
}

const registerValidation = (data) => {
    const schema = Joi.object({
        lname: Joi.string().min(3).required(),
        mobile: Joi.number().required(),
        username: Joi.string().min(5).required(),
        role: Joi.string().min(4).required(),
        fname: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;