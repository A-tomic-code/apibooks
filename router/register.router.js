const Router = require('express');
const router = Router();

const registerCtrl = require('../controller/register.controller');

router.post('/registrarse', registerCtrl.register);

module.exports = router