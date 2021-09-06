import React,{useState} from 'react'
import { useDispatch } from 'react-redux'

import Card from '../../../../Common/card/Card';
import Button from '../../../../Common/Button/Button';
import TextInput from '../../../../Common/TextInput/TextInput';
import styles from '../PhoneEmail.module.css'
import {sendOtp} from '../../../../../api/index';
import { setOtp } from '../../../../../store/authSlice'

const Phone = ({nextHandler}) => {
    const[phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    const clickHandler = async ()=>{
        if(!phoneNumber) return;
        const {data} = await sendOtp({'phone': phoneNumber});
        console.log("resposne is: ", data);
        dispatch(setOtp({
            phone: data.phone ,
            hash: data.hash 
        }));

        nextHandler();
    }
    return (
        <Card title='Enter your Phone Number' icon='phone'>
        <TextInput value= {phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} />
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
    )
}

export default Phone
