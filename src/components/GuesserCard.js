import React, { useState } from 'react'
import Web3 from 'web3'
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

const GuesserCard = ({ contract, cardDetails, userObj, priceInEther, web3, maticPriceInUsd }) => {

    const [guess, setGuess] = useState();

    const enterLottery = async () => {
        try {
            await contract.methods.enter(guess).send({
                from: userObj.address,
                value: web3.utils.toWei(String(priceInEther), "ether"),
                gas: 3000000,
                gasPrice: 40000000000
            })
        } catch (err) {
            console.log(err.message);
        }
    }



    const handleChange = (e) => {
        const { value } = e.target;
        setGuess(value);
    }

    const pickWinner = async () => {
        const ownerAddress = await contract.methods.pickWinner().send({
            from: userObj.address,
            value: 0,
            gas: 3000000,
            gasPrice: 40000000000
        });
    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="lotto-card">
                <img src="static/Card-bg.svg" alt="" className="card-bg" />
                <img className='life-buoy' src="static/dice-bg.svg" alt="" />
                <div style={{ zIndex: '100' }} className="lotto-card">

                    <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'flex-end' }}>
                        {cardDetails.ownerAddress == userObj.address && userObj.address ? <button onClick={pickWinner}>x</button> : ''}
                    </div>

                    <h1>{cardDetails.players} players</h1>
                    <h2>Prize pot</h2>

                    <form onSubmit={enterLottery} style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type="number" min={1} max={10} onChange={handleChange} required placeholder='enter guess' />
                        <Button variant="contained" type="submit" style={{ background: '#7962ea' }}>BUY TICKET</Button>
                    </form>

                    <h2>${(priceInEther * maticPriceInUsd).toFixed(2)}/ticket</h2>
                    <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'flex-end' }}>
                        <p>{cardDetails.usersTickets}x</p>
                        <FontAwesomeIcon icon={faTicket} style={{ color: '#7962ea' }} />
                    </div>
                </div>
            </div>

            <div className="pool-balance">
                <img src="/static/polygon-symbol-black.svg" alt="" className='polygon-symbol' />
                <h1>{cardDetails.balance}</h1>
            </div>

        </div>

    )
}

export default GuesserCard