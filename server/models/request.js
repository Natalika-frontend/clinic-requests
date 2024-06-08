const { Schema, model} = require('mongoose');
const validator = require('validator');

const RequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isMobilePhone(v, 'any', { strictMode: false });
            },
            message: "Invalid phone number",
        }
    },
    problem: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Request = model('Request', RequestSchema);

module.exports = Request;
