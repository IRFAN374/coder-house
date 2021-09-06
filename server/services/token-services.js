const jwt = require('jsonwebtoken');
const refreshModel = require('../modals/refresh-model')
const accessTokenSecret = process.env.JWT_SECRET_TOKEN;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;



class tokenServices {
    generateToken(payload){
       const accessToken =  jwt.sign(payload, accessTokenSecret, { expiresIn: '1m' });
       const refreshToken = jwt.sign(payload, refreshTokenSecret,{ expiresIn: '1y' });
       return { accessToken, refreshToken};
    }

    async storeRefreshToken(token, userId){
      try {
          await refreshModel.create({
              token,
              userId
          })
      } catch (error) {
          console.log("Error in Refresh token", error);
      }
    }
    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

    async verifyRefreshToken(token){
        return jwt.verify(token,refreshTokenSecret);
    }

    async findRefreshToken(userId, refreshToken) {
        return await refreshModel.findOne({
            userId: userId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId, refreshToken) {
        return await refreshModel.updateOne(
            { userId: userId },
            { token: refreshToken }
        );
    }

    async removeToken(refreshToken) {
        return await refreshModel.deleteOne({ token: refreshToken });
    }
}

module.exports = new tokenServices();