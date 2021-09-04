const router = require('express').Router();
const authController = require('../Controllers/auth-controller')
const activateController  = require('../Controllers/activate-controller')
const authMiddleware = require('../middleware/auth-middleware');


router.post('/api/v1/send-otp',authController.sendOtp)
router.post('/api/v1/verify-otp', authController.verifyOtp)
router.post('/api/v1/activate', authMiddleware, activateController.activate);

module.exports = router