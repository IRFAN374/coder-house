import React, {useState} from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './PhoneEmail.module.css';


const PhoneEmailType = {
    'phone': Phone,
    'email': Email
};

const PhoneEmail = ({nextHandler}) => {
    const [type, setType] = useState('phone');
    const Component = PhoneEmailType[type];
    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrapper}>
                        <button className={`${styles.btnTab} ${ type ==='phone' ? styles.active :''}`} onClick={()=> setType('phone')}>
                            <img src="/images/phone-white.png" alt="phone" />
                        </button>
                        <button className={`${styles.btnTab} ${ type ==='email' ? styles.active :''}`} onClick={()=> setType('email')}>
                            <img src="/images/mail-white.png" alt="mail" />
                        </button>
                    </div>
                    <Component nextHandler={nextHandler} />
                </div>
            </div>
        </>
    )
}

export default PhoneEmail
