const express = require('express');
const now = require('../controllers/log');

const router = express.Router();

router.post('/login', now.register);

module.exports = router;
