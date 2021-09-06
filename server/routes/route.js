const router = require('express').Router();
const authController = require('../Controllers/auth-controller')
const activateController  = require('../Controllers/activate-controller')
const authMiddleware = require('../middleware/auth-middleware');


router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp', authController.verifyOtp)
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);

module.exports = router