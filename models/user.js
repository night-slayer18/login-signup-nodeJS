const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

// create user schema
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
	lastName: { type: String, required: true },
    username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
    usertype: { type: String, required: true, default: 'admin' },
    date: { type: Date, default: Date.now },
});

// Generate an auth token for the user
UserSchema.methods.generateAuthToken = function () {   
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: '10d' });
    //console.log(token);
    return token;
}

// create user model
const User = mongoose.model('user', UserSchema);


const validateUser = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        username: Joi.string().required().label("Username"),
    });
    return schema.validate(data);
}

module.exports = { User, validateUser }