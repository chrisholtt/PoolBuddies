import React, { useEffect, useState } from 'react'
import LotteryCard from '../components/LotteryCard';
import Button from '@mui/material/Button';


const Pools = ({ lotteryContract5, userObj, web3 }) => {

    const [totalValueOfAllPools, setTotalValueOfAllPools] = useState(0.00);
    const [maticPriceInUsd, setMaticPriceInUsd] = useState(0.00);

    const [lotteryContract5Details, setLotteryContract5Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xa43485521AbC7BCFA48556332A8cb4aaB000b4Bd",
        adresses: [],
        usersTicketCount: 0,
    });

    // On page load fetch this
    useEffect(() => {
        getContract5Info()
        fetchMaticPrice()
    }, [userObj])

    const getContract5Info = async () => {
        const players5 = await lotteryContract5.methods.getPlayersLength().call();
        const balance5 = await lotteryContract5.methods.getBalance().call();
        const poolFull = await lotteryContract5.methods.isPoolFull().call();
        const listOfAddressesInContract = await lotteryContract5.methods.getPlayers().call();
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
            const playersTicketCount = getPlayersTicketCount(lotteryContract5Details.adresses);
            return { ...prev, usersTicketCount: playersTicketCount }
        })

    }

    // Loops over address list and counts users address occurance
    const getPlayersTicketCount = (addresses) => {
        let entries = 0;
        for (const address in addresses) {
            addresses[address] == userObj.address ? entries += 1 : entries = 1;
        }
        return entries;
    }





    // When contracts value changes, update total value in all pools
    useEffect(() => {
        const tvlAcrossAllPoolsInUsd = maticPriceInUsd * (lotteryContract5Details.balance)
        setTotalValueOfAllPools(tvlAcrossAllPoolsInUsd.toFixed(3));
    }, [lotteryContract5Details.balance])


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
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
                        <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
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