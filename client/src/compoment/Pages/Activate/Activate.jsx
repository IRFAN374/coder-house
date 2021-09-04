import React,{ useState} from 'react'
import Name from '../Steps/StepName/Name';
import Avatar from '../Steps/StepAvatar/Avatar';


const steps ={
    1: Name,
    2: Avatar
}

const Activate = () => {
    const [ step, setStep ] = useState(1);
    const Step = steps[step];
    const nextHandler = ()=>{
        setStep(step+1);
    }
    return (
        <div className="cardWrapper">
            <Step nextHandler={nextHandler} />
        </div>
    )
}

export default Activate
