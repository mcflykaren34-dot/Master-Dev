const Router = require('express').Router;
const {createPhone, getPhone} = require('../controller/phone');

const router = Router();

router.get('/getphone', getPhone);
router.post('/createphone', createPhone);

module.exports = router;