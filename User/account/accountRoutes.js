const express = require('express');
const router = express.Router();
const verifyJWT = require('../validators/verifyJWT')
const { accountView, addressView } = require('./accountController')


router.get('/', accountView);
router.get('/address', addressView);



module.exports = router;