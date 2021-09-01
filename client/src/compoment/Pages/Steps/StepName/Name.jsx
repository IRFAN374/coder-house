import React from 'react'
import styles from './Name.module.css'

const Name = ({nextHandler}) => {
    return (
        <>
            <div>
                I am Name
            </div>
            <button onClick={nextHandler}>next</button>
        </>
    )
}

export default Name
