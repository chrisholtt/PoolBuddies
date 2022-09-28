import React, { useEffect, useState } from 'react'
import LotteryCard from '../components/LotteryCard';
import Button from '@mui/material/Button';
import createContract5 from '../contracts/lotteryContract5';
import createContract10 from '../contracts/lotteryContract10';
import createContract30 from '../contracts/lotteryContract30';

const Pools = ({ userObj, web3 }) => {

    const [totalValueOfAllPools, setTotalValueOfAllPools] = useState(0.00);
    const [maticPriceInUsd, setMaticPriceInUsd] = useState(0.00);
    // Lottery contract
    const [lotteryContract5, setLotteryContract5] = useState();
    const [lotteryContract10, setLotteryContract10] = useState();
    const [lotteryContract30, setLotteryContract30] = useState();




    const [lotteryContract5Details, setLotteryContract5Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xa43485521AbC7BCFA48556332A8cb4aaB000b4Bd",
        adresses: [],
        usersTickets: 0
    });

    const [lotteryContract10Details, setLotteryContract10Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0x4fd2ca3845f1b8032d6a2B941B7475130f30434c",
        adresses: [],
        usersTickets: 0
    });

    const [lotteryContract30Details, setLotteryContract30Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xA99d6F1d26888e6a4b374750c4fD183beA4b6290",
        adresses: [],
        usersTickets: 0
    });

    // On page load fetch this (needs fixing)
    useEffect(() => {
        if (web3) {
            setLotteryContract5(createContract5(web3));
            setLotteryContract10(createContract10(web3));
            setLotteryContract30(createContract30(web3));
            getContract5Info();
            getContract10Info();
            getContract30Info();
            fetchMaticPrice();
        }
    }, [userObj])

    const getContract5Info = async () => {
        const players5 = await lotteryContract5.methods.getPlayersLength().call();
        const balance5 = await lotteryContract5.methods.getBalance().call();
        const poolFull = await lotteryContract5.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract5.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract5.methods.getUsersTickets(userObj.address).call();
        // Set how many people in contract
        setLotteryContract5Players((prev) => {
            return { ...prev, players: players5 }
        })
        // Set contracts balance
        setLotteryContract5Players((prev) => {
            return { ...prev, balance: web3.utils.fromWei(balance5, 'ether') }
        })
        // Set is the pool at max capacity
        setLotteryContract5Players((prev) => {
            return { ...prev, poolFull: poolFull }
        })
        // Set the list of players
        setLotteryContract5Players((prev) => {
            return { ...prev, adresses: listOfAddressesInContract }
        })
        // Set the users ticket count
        setLotteryContract5Players((prev) => {
            return { ...prev, usersTickets: usersTicketCount }
        })
    }

    const getContract10Info = async () => {
        const players5 = await lotteryContract10.methods.getPlayersLength().call();
        const balance5 = await lotteryContract10.methods.getBalance().call();
        const poolFull = await lotteryContract10.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract10.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract10.methods.getUsersTickets(userObj.address).call();
        // Set how many people in contract
        setLotteryContract10Players((prev) => {
            return { ...prev, players: players5 }
        })
        // Set contracts balance
        setLotteryContract10Players((prev) => {
            return { ...prev, balance: web3.utils.fromWei(balance5, 'ether') }
        })
        // Set is the pool at max capacity
        setLotteryContract10Players((prev) => {
            return { ...prev, poolFull: poolFull }
        })
        // Set the list of players
        setLotteryContract10Players((prev) => {
            return { ...prev, adresses: listOfAddressesInContract }
        })
        // Set the users ticket count
        setLotteryContract10Players((prev) => {
            return { ...prev, usersTickets: usersTicketCount }
        })
    }

    const getContract30Info = async () => {
        const players30 = await lotteryContract30.methods.getPlayersLength().call();
        const balance30 = await lotteryContract30.methods.getBalance().call();
        const poolFull = await lotteryContract30.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract30.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract30.methods.getUsersTickets(userObj.address).call();
        // Set how many people in contract
        setLotteryContract30Players((prev) => {
            return { ...prev, players: players30 }
        })
        // Set contracts balance
        setLotteryContract30Players((prev) => {
            return { ...prev, balance: web3.utils.fromWei(balance30, 'ether') }
        })
        // Set is the pool at max capacity
        setLotteryContract30Players((prev) => {
            return { ...prev, poolFull: poolFull }
        })
        // Set the list of players
        setLotteryContract30Players((prev) => {
            return { ...prev, adresses: listOfAddressesInContract }
        })
        // Set the users ticket count
        setLotteryContract30Players((prev) => {
            return { ...prev, usersTickets: usersTicketCount }
        })
    }


    // When contracts value changes, update total value in all pools
    useEffect(() => {
        const tvlAcrossAllPoolsInUsd = maticPriceInUsd * (Number(lotteryContract5Details.balance) + Number(lotteryContract10Details.balance) + Number(lotteryContract30Details.balance));
        setTotalValueOfAllPools(tvlAcrossAllPoolsInUsd.toFixed(3));
    }, [lotteryContract5Details.balance]);

    // Get current price of matic
    const fetchMaticPrice = async () => {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd");
        const data = await response.json();
        const price = data["matic-network"]["usd"];
        setMaticPriceInUsd(price);
    }



    return (
        <>
            <section className='vh60'>
                <h1>PoolBuddies Lottery</h1>
                <h2>${totalValueOfAllPools}</h2>
                <h3>Total value in all pools</h3>
                <Button variant="contained">BUY TICKETS</Button>
                <iframe className='pool-spline' src='https://my.spline.design/untitled-54d92db158650d659143ee00378595cf/' frameborder='0' width='100%' height='100%'></iframe>
            </section>

            <section>
                <container>
                    <h1>Open pools</h1>
                    <div style={{ width: '50vw' }}>
                        <hr />
                    </div>
                </container>

                <container>
                    <div style={{ width: '90vw' }}>
                        <h1>Dip and win</h1>
                    </div>
                    <div className='pools-container'>
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={1.01} web3={web3} />
                        <LotteryCard contract={lotteryContract10} cardDetails={lotteryContract10Details} maxPlayers={10} userObj={userObj} priceInEther={1.01} web3={web3} />
                        <LotteryCard contract={lotteryContract30} cardDetails={lotteryContract30Details} maxPlayers={30} userObj={userObj} priceInEther={1.01} web3={web3} />
                    </div>
                </container>

                <container>
                    <div style={{ width: '90vw' }}>
                        <h1>Dip and win</h1>
                    </div>
                    <div className='pools-container'>
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
                    </div>
                </container>



            </section>
            {/* <div className="forsted-bg"></div> */}
        </>
    )
}

export default Pools