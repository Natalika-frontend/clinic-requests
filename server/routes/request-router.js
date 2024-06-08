const express = require('express');
const { createRequest, getRequests } = require('../controllers/request.controller');

const router = express.Router();

router.post('/requests', createRequest);
router.get('/requests', getRequests);

module.exports = router;
