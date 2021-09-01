import React from 'react'
import styles from './Avatar.module.css'

const Avatar = ({nextHandler}) => {
    return (
        <>
            <div>
                I am Avatar
            </div>
            <button onClick={nextHandler}>next</button>
        </>

    )
}

export default Avatar
