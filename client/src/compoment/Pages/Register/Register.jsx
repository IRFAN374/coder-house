import React, { useState } from 'react'
import Avatar from '../Steps/StepAvatar/Avatar';
import Name from '../Steps/StepName/Name';
import PhoneEmail from '../Steps/StepPhoneEmail/PhoneEmail';
import Otp from '../Steps/StepOtp/Otp';
import UserName from '../Steps/StepUserName/UserName';


import styles from './Register.module.css'

const steps ={
    1: PhoneEmail,
    2: Otp,
    3: Name,
    4: Avatar,
    5: UserName
}

const Register = () => {
    const [ step, setStep ] = useState(1);
    const Step = steps[step];
    const nextHandler = ()=>{
        setStep(step+1);
    }
    return (
        <div>
           <Step nextHandler={nextHandler} />
        </div>
    )
}

export default Register
