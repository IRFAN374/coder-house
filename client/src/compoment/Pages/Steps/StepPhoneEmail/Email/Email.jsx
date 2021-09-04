import React,{useState} from 'react'
import Card from '../../../../Common/card/Card';
import Button from '../../../../Common/Button/Button';
import TextInput from '../../../../Common/TextInput/TextInput';
import styles from '../PhoneEmail.module.css'


const Email = ({nextHandler}) => {
    const[email, setEmail] = useState('');
    return (
        <Card title='Enter your Email' icon='email'>
        <TextInput value= {email} onChange={(e)=> setEmail(e.target.value)} />
        <div>
            <div className={styles.actionButtonWrap}>
                <Button buttonHandler={nextHandler}  text="next" />
            </div>
            <p className={styles.bottomParagraph}>
                By entering your email, you’re agreeing to our Terms of
                Service and Privacy Policy. Thanks!
            </p>
        </div>
        
    </Card>
    )
}

export default Email
