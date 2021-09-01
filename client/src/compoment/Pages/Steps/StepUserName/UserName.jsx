import React from 'react'

const UserName = ({nextHandler}) => {
    return (
        <>
            <div>
                I am Avatar
            </div>
            <button onClick={nextHandler}>next</button>
        </>
    )
}

export default UserName
