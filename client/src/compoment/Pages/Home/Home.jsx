import React from 'react'
import {Link, useHistory } from 'react-router-dom'
import styles from './Home.module.css';
import Card from '../../Common/card/Card';
import Button from '../../Common/Button/Button';

const Home = () => {
    const history = useHistory();
    const buttonHandler = ()=>{
       // console.log('Button Clicked')
       history.push('/authenticate')
    }
    return (
        <div className={styles.cardContainer}>
            <Card title='Welcome to Coder House' icon='logo'>
                <p className={styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks 
                </p>
                <div>
                    <Button buttonHandler={buttonHandler} text="Let's Go" />
                </div>
                <div className={styles.signIn}>
                    <span>Have an invite text?</span>
                    {/* <Link className={styles.link} to='/login'>Sign In</Link> */}
                </div>
            </Card>
        </div>
    )
}

export default Home
