import React,{useState} from 'react'
import Card from '../../../Common/card/Card'
import TextInput from '../../../Common/TextInput/TextInput'
import Button from '../../../Common/Button/Button'
import styles from './Otp.module.css'

import { verifyOtp } from '../../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../../store/authSlice'

const Otp = ({nextHandler}) => {
    const [otp,setOtp] = useState('');

    const {phone, hash} = useSelector((state)=> state.auth.otp);
    const dispatch = useDispatch();

    const clickHandler = async()=>{
        if(!otp || !phone || !hash) return;
        try {
            const {data} = await verifyOtp({otp, phone, hash})
            console.log("otp verification",data);
            dispatch(setAuth(data));
        } catch (error) {
            console.log(error)
        }
      
       // nextHandler();
    }

    return (
        <>
            <div className= {styles.cardWrapper}>
               <Card title="Enter the Code we just texted you" icon='lock'>
                  <TextInput value= {otp} onChange={(e)=> setOtp(e.target.value)} />
                  <div>
                    <div className={styles.actionButtonWrap}>
                        <Button buttonHandler={clickHandler} text="next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                  </div>
               </Card>
            </div>
        </>
    )
}

export default Otp
