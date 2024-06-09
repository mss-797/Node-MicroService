const express = require('express');
const router = express.Router();
const { home, sign_up, sign_in } = require('../controller/user.controller');

router.get('/home', home);
router.post('/sign-up', sign_up);
router.post('/sign-in', sign_in);
module.exports = router;