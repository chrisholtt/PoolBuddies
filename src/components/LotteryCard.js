import React from 'react'
import Web3 from 'web3'

const LotteryCard = ({ contract, cardDetails, maxPlayers, userObj, priceInEther, web3 }) => {

    const enterLottery = async () => {
        try {
            await contract.methods.enter().send({
                from: userObj.address,
                value: web3.utils.toWei(String(priceInEther), "ether"),
                gas: 3000000,
                gasPrice: null
            })
        } catch (err) {
            console.log(err.message);
        }
    }



    const pickWinner = async () => {
        const ownerAddress = await contract.methods.pickWinner().send({
            from: userObj.address,
            value: 0,
            gas: 3000000,
            gasPrice: null
        });
    }


    return (
        <div className="lotto-card">
            <h1>{cardDetails.players} / {maxPlayers}</h1>

            <div className="pool-balance">
                <h2>TVL: {cardDetails.balance} </h2>
                <img src="/static/polygon-symbol-black.svg" alt="" className='polygon-symbol' />
            </div>

            <button onClick={enterLottery} disabled={cardDetails.poolFull}>BUY TICKET</button>
            <h2>{cardDetails.poolFull}</h2>
            <h2>entry fee: {priceInEther}</h2>
            <h2>payout: {(priceInEther * maxPlayers).toFixed(2)}</h2>

            <button onClick={pickWinner}>pick winner</button>


        </div>
    )
}

export default LotteryCard