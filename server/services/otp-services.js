const crypto = require('crypto');
const hashServices = require('./hash-service');


const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, { lazyLoading: true });

class OtpSerices {
   async generateOtp(){
        return crypto.randomInt(1000,9999);
    }
    async sendBySms(phone, otp){
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your coder house Otp is: ${otp}`
        })
    }
    verifyBySms(hashedOtp, data){
        let computedHashed = hashServices.hashOtp(data);
        return computedHashed === hashedOtp;
    }
}

module.exports = new OtpSerices();