import React from 'react'
import styles from './Button.module.css'

const Button = ({text,buttonHandler}) => {
    return (
            <button onClick={buttonHandler} className={styles.button}>
                <span>{text}</span>
                <img className={styles.arrow} src="/images/arrow-forward.png" alt="arrow-forward" />
            </button>
    )
}

export default Button
