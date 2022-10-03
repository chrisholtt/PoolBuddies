import React from 'react'

const Token = () => {
    return (
        <>
        <img className='Token-Logo' src="/static/buddie-logo.svg"/>
        <div className='total-supply'>
            <h1>Total Supply:
                1,000,000,000,000
            </h1>
        </div>
        <div>
            <h2>Welcome to the Royal Jelly Token</h2>
            <p className='token-info'>
                This is our coin, like Dogecoin, Royal Jelly is a fun token to see how a community can come together and GROW.
            </p>
        </div>
        </>
    )
}

export default Token;