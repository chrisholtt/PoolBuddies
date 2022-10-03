import React from 'react'

const Token = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img className='Token-Logo' src="/static/RJellyCoin.png" />
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
            </div>
        </>
    )
}

export default Token;