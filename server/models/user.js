const { Schema, model} = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 60
    },
    roles: [{type: String, ref: 'Role'}]
});

const User = model('User', UserSchema);

module.exports = User;
