import React from 'react'
import Web3 from 'web3'
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

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

    const PickWinnerButton = async () => {
        const contractOwnerAddress = await contract.methods.getOwnersAddress().call();
        console.log(contractOwnerAddress);
        return (
            <button>hey</button>
        )
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={6} className="lotto-card">
                <h1>{cardDetails.players} / {maxPlayers}</h1>

                <h2>Prize pot</h2>
                <div className="pool-balance">
                    <h1>{cardDetails.balance} </h1>
                    <img src="/static/polygon-symbol-black.svg" alt="" className='polygon-symbol' />
                </div>

                <Button variant="contained" onClick={enterLottery} disabled={cardDetails.poolFull}>BUY TICKET</Button>
                {/* <button onClick={enterLottery} disabled={cardDetails.poolFull}>BUY TICKET</button> */}
                <h2>{cardDetails.poolFull}</h2>
                <h2>entry fee: {priceInEther}</h2>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                </div>

                <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'flex-end' }}>
                    <p>{cardDetails.usersTickets}x</p>
                    <FontAwesomeIcon icon={faTicket} />
                </div>

                {/* <button onClick={pickWinner}>pick winner</button> */}
            </Paper>
            <h2>payout: {(priceInEther * maxPlayers).toFixed(2)}</h2>

        </div>

    )
}

export default LotteryCard