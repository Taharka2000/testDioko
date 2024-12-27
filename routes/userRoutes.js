const express = require('express');
const { registerUser } = require('../controllers/userControllers');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', upload.single('idCard'), registerUser);

module.exports = router;
