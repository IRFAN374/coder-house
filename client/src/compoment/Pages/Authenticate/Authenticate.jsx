import React,{ useState} from 'react'
import PhoneEmail from '../Steps/StepPhoneEmail/PhoneEmail';
import Otp from '../Steps/StepOtp/Otp';


const steps ={
    1: PhoneEmail,
    2: Otp
}

const Authenticate = () => {
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

export default Authenticate
