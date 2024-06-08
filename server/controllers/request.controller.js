const Request = require('../models/Request');

async function createRequest(req, res) {
    try {
        const {name, phone, problem} = req.body;
        const newRequest = new Request({name, phone, problem});
        await newRequest.save();
        res.status(201).json({message: 'Request created successfully'});
    } catch (e) {
        res.status(500).json({e: 'Server error'});
    }
}

async function getRequests(req, res) {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (e) {
        res.status(500).json({e: 'Server error'});
    }
};

module.exports = {createRequest, getRequests};
