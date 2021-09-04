
const tokenServices = require('../services/token-services')

module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies;
        console.log('accessToken: ',accessToken)
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenServices.verifyAccessToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};