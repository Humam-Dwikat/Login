const express = require('express');
const now = require('../controllers/log');

const router = express.Router();

router.post('/login', now.login);

module.exports = router;
