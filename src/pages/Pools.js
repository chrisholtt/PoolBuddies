import React, { useEffect, useState } from 'react'
import LotteryCard from '../components/LotteryCard';

const Pools = ({ lotteryContract5, userObj, web3 }) => {

    const [lotteryContract5Details, setLotteryContract5Players] = useState({
        players: 0,
        balance: 0,
        poolFull: false,
        address: "0xa43485521AbC7BCFA48556332A8cb4aaB000b4Bd"
    });

    const getContract5Info = async () => {
        const players5 = await lotteryContract5.methods.getPlayersLength().call();
        const balance5 = await lotteryContract5.methods.getBalance().call();
        const poolFull = await lotteryContract5.methods.isPoolFull().call();
        setLotteryContract5Players((prev) => {
            return { ...prev, players: players5 }
        })
        setLotteryContract5Players((prev) => {
            return { ...prev, balance: web3.utils.fromWei(balance5, 'ether') }
        })
        setLotteryContract5Players((prev) => {
            return { ...prev, poolFull: poolFull }
        })
    }


    useEffect(() => {
        getContract5Info()
    }, [])


    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <LotteryCard contract={lotteryContract5} cardDetails={lotteryContract5Details} maxPlayers={5} userObj={userObj} priceInEther={0.011} web3={web3} />
        </div>
    )
}

export default Pools