const otpServices = require('../services/otp-services');
const hashServices =require('../services/hash-service');
const userServices = require('../services/user-services');
const tokenServices = require('../services/token-services');
const userDtos = require('../dtos/user-dtos');

class AuthController {
   async sendOtp(req,res){
        const { phone } = req.body;
        //console.log('phone', phone)
        if(!phone){
            return res.status(400).json({
                message: 'phone field is required'
            })
        }
       const otp = await otpServices.generateOtp();
       const ttl = 1000 * 60 * 10; // 10 min
       const expiresTime = Date.now() + ttl ;
       const data = `${phone}.${otp}.${expiresTime}`;
       const hashed = hashServices.hashOtp(data);

       try {
        //    await otpServices.sendBySms(phone, otp);
           return res.status(200).json({
               phone,
               hash: `${hashed}.${expiresTime}`,
               otp
           })
       } catch (error) {
           console.log('Error: ', error)
           return res.status(500).json({
               error
           })
       }
    //    return res.status(200).json({ hashed })
    }

    // verify-otp

   async verifyOtp(req,res){
        const {phone, otp, hash} = req.body;
        //console.log(phone, otp, hash);
        if(!phone || !otp || !hash){ return res.status(400).json({ message: 'All fields are required' }) }

        const [hashedOtp, expiresTime] = hash.split('.');
        if(+expiresTime < Date.now()){ return res.status(401).json({ message: 'Otp expired, Please create Otp again' }) }
        
        const data = `${phone}.${otp}.${expiresTime}`;

        const isValid = otpServices.verifyBySms(hashedOtp, data);
        if(!isValid){ return res.status(400).json({ message: 'your Otp is not valid' }) }

        let user;
        

        try {
             user  = await userServices.findUser({phone});
            if(!user){
                user = await userServices.createUser({phone});
            }
        } catch (error) {
            console.log('error in DB', error); 
            return res.status(500).json({ message: 'error in db', error })
        }
        // generate token

        const {accessToken, refreshToken} = tokenServices.generateToken({_id: user._id, activated: false});
        await tokenServices.storeRefreshToken(refreshToken,user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        const userDto = new userDtos(user);
      return res.status(201).json({auth: true ,user:userDto})
    }

    async refresh (req,res){
          // get refresh token from cookie
          const { refreshToken: refreshTokenFromCookie } = req.cookies;
          // check if token is valid
          let userData;
          try {
              userData = await tokenServices.verifyRefreshToken(
                  refreshTokenFromCookie
              );
          } catch (err) {
              return res.status(401).json({ message: 'Invalid Token' });
          }
          // Check if token is in db
          try {
            const token = await tokenServices.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // check if valid user
        const user = await userServices.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }
        // Generate new tokens
        const { refreshToken, accessToken } = tokenServices.generateToken({
            _id: userData._id,
        });

         // Update refresh token
         try {
            await tokenServices.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        const userDto = new userDtos(user);
        res.json({ user: userDto, auth: true });

    }

    async logout (req,res) {
        const { refreshToken } = req.cookies;
        // delete refresh token from db
        await tokenServices.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }
}


module.exports = new AuthController();
