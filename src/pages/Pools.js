import React, { useEffect, useState } from 'react'
import LotteryCard from '../components/LotteryCard';
import GuesserCard from '../components/GuesserCard';
import Button from '@mui/material/Button';
import createContract5 from '../contracts/lotteryContract5';
import createContract10 from '../contracts/lotteryContract10';
import createContract30 from '../contracts/lotteryContract30';
import createContractGuesser from '../contracts/guesserContract';

const Pools = ({ userObj, web3 }) => {

    const [totalValueOfAllPools, setTotalValueOfAllPools] = useState(0.00);
    const [maticPriceInUsd, setMaticPriceInUsd] = useState(0.00);

    // Lottery contract states
    const [lotteryContract5, setLotteryContract5] = useState();
    const [lotteryContract10, setLotteryContract10] = useState();
    const [lotteryContract30, setLotteryContract30] = useState();
    const [guesserContract, setGuesserContract] = useState();





    const [lotteryContract5Details, setLotteryContract5Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xa43485521AbC7BCFA48556332A8cb4aaB000b4Bd",
        adresses: [],
        usersTickets: 0,
        ownerAddress: ''
    });

    const [lotteryContract10Details, setLotteryContract10Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0x4fd2ca3845f1b8032d6a2B941B7475130f30434c",
        adresses: [],
        usersTickets: 0,
        ownerAddress: ''
    });

    const [lotteryContract30Details, setLotteryContract30Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xA99d6F1d26888e6a4b374750c4fD183beA4b6290",
        adresses: [],
        usersTickets: 0,
        ownerAddress: ''
    });

    const [guesserContractDetails, setGuesserContractDetails] = useState({
        players: 0,
        balance: 0,
        address: '0xf9378a479E464E8413c498227Fbf9Cb74B1b843a',
        winners: [],
        usersTickets: 0,
        ownersAddress: "0x57EC945135813e88F483b0697C3779f85397e387",
        previousWinningNumber: 0
    })

    // On page load fetch this (needs fixing)
    useEffect(() => {
        if (web3) {
            setLotteryContract5(createContract5(web3));
            setLotteryContract10(createContract10(web3));
            setLotteryContract30(createContract30(web3));
            setGuesserContract(createContractGuesser(web3));
            getContract5Info();
            getContract10Info();
            getContract30Info();
            getGuesserContractInfo();
            fetchMaticPrice();
        }
    }, [userObj, web3])

    const getGuesserContractInfo = async () => {
        const players = await guesserContract.methods.getNumberOfPlayers().call();
        // Setting players in state
        setGuesserContractDetails((prev) => {
            return { ...prev, players: players }
        })

        const balance = await guesserContract.methods.getBalance().call();
        // Setting balance in state
        setGuesserContractDetails((prev) => {
            return { ...prev, balance: web3.utils.fromWei(balance, 'ether') }
        })

        const winners = await guesserContract.methods.getPreviousWinners().call();
        // Setting winners in state
        setGuesserContractDetails((prev) => {
            return { ...prev, winners: winners }
        })

        const previousWinningNumber = await guesserContract.methods.getWinningNumber().call();
        // Setting previous winning number in state
        setGuesserContractDetails((prev) => {
            return { ...prev, previousWinningNumber: previousWinningNumber }
        })

        const usersTicketCount = await guesserContract.methods.getUsersTickets(userObj.address).call();
        setGuesserContractDetails((prev) => {
            return { ...prev, usersTickets: usersTicketCount }
        })
    }

    const getContract5Info = async () => {
        const players5 = await lotteryContract5.methods.getPlayersLength().call();
        const balance5 = await lotteryContract5.methods.getBalance().call();
        const poolFull = await lotteryContract5.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract5.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract5.methods.getUsersTickets(userObj.address).call();
        const ownersAddress = await lotteryContract5.methods.getOwnersAddress().call();
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
        // Setting the contract owners address
        setLotteryContract5Players((prev) => {
            return { ...prev, ownerAddress: ownersAddress }
        })

    }

    const getContract10Info = async () => {
        const players5 = await lotteryContract10.methods.getPlayersLength().call();
        const balance5 = await lotteryContract10.methods.getBalance().call();
        const poolFull = await lotteryContract10.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract10.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract10.methods.getUsersTickets(userObj.address).call();
        const ownersAddress = await lotteryContract10.methods.getOwnersAddress().call();
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
        // Setting the contract owners address
        setLotteryContract10Players((prev) => {
            return { ...prev, ownerAddress: ownersAddress }
        })
    }

    const getContract30Info = async () => {
        const players30 = await lotteryContract30.methods.getPlayersLength().call();
        const balance30 = await lotteryContract30.methods.getBalance().call();
        const poolFull = await lotteryContract30.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract30.methods.getPlayers().call();
        const usersTicketCount = await lotteryContract30.methods.getUsersTickets(userObj.address).call();
        const ownersAddress = await lotteryContract10.methods.getOwnersAddress().call();
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
        // Setting the contract owners address
        setLotteryContract30Players((prev) => {
            return { ...prev, ownerAddress: ownersAddress }
        })
    }


    // When contracts value changes, update total value in all pools
    useEffect(() => {
        const tvlAcrossAllPoolsInUsd = maticPriceInUsd * (Number(lotteryContract5Details.balance) + Number(lotteryContract10Details.balance) + Number(lotteryContract30Details.balance) + Number(guesserContractDetails.balance));
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
                    <h1>Open Pools</h1>
                    <div style={{ width: '50vw' }}>
                        <hr />
                    </div>
                </container>

                <container>
                    <div style={{ width: '90vw' }}>
                        <h1>Dip and win</h1>
                    </div>
                    <div className='pools-container'>
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                        <LotteryCard contract={lotteryContract10} cardDetails={lotteryContract10Details} maxPlayers={10} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                        <LotteryCard contract={lotteryContract30} cardDetails={lotteryContract30Details} maxPlayers={30} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                    </div>
                </container>

                <container>
                    <div style={{ width: '90vw' }}>
                        <h1>Number guess</h1>
                    </div>
                    <div className='pools-container'>
                        <GuesserCard contract={guesserContract} cardDetails={guesserContractDetails} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                        <GuesserCard contract={guesserContract} cardDetails={guesserContractDetails} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                        <GuesserCard contract={guesserContract} cardDetails={guesserContractDetails} userObj={userObj} priceInEther={1.005} web3={web3} maticPriceInUsd={maticPriceInUsd} />
                    </div>
                </container>



            </section>
            {/* <div className="forsted-bg"></div> */}
        </>
    )
}

export default Pools