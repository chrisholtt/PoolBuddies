import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Nft from './pages/Nft';
import { useEffect, useState } from 'react';
import Web3 from 'web3'

import createContract5 from './contracts/lotteryContract5'
=======
import Home from './pages/Home';



function App() {

  const [tokens, setTokens] = useState([]);
  const [web3, setWeb3] = useState();
  const [lotteryContract5, setLotteryContract5] = useState();

  useEffect(() => {
    fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org')
      .then(res => res.json())
      .then(data => setTokens(data.tokens))
  })

  const [userObj, setUserObj] = useState({
    isConnected: false,
    address: "",
    balance: 0.00
  });

  const detect = () => {
    let provider;
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          console.log(result[0]);
        })
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Install MetaMask")
    }
    return provider;
  }


  const onConnect = async () => {
    // Trying to connect to web3 provider
    try {
      const currentProvider = window.web3.currentProvider;
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(currentProvider);
        setWeb3(web3);
        // Getting user address
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        // Getting native balance
        let balance = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balance, 'ether')
        handleBalanceUpdate(Number(balanceInEther).toFixed(2));
        handleUserSignIn(account);
        connectUser(true);
        // Create local instance of contracts
        setLotteryContract5(createContract5(web3));
      }
    } catch (err) {
      console.log(err);
      console.log("Failed to connect to web3 provider, try installing MetaMask");
    }
  }


  const connectUser = () => {
    setUserObj((prev) => {
      return { ...prev, isConnected: true }
    })
  }

  const disconnectUser = () => {
    setUserObj((prev) => {
      return { ...prev, isConnected: false }
    })
  }

  const handleUserSignIn = (address) => {
    setUserObj((prev) => {
      return { ...prev, address: address }
    })
  }

  const handleBalanceUpdate = (balance) => {
    setUserObj((prev) => {
      return { ...prev, balance: balance }
    })
  }


  return (
    <>
      <Navbar handleUserSignIn={handleUserSignIn} userObj={userObj} onConnect={onConnect} disconnectUser={disconnectUser} />
      <Routes>
     
        <Route path="/swap" element={<Swap tokens={tokens} user={userObj} />} />
        <Route path="/pools" element={<Pools lotteryContract5={lotteryContract5} userObj={userObj} web3={web3} />} />

        <Route path="/" element={<Home />}/>
        <Route path="/swap" element={<Swap tokens={tokens} user={userObj}/>} />
        <Route path="/pools" element={<Pools />} />main
        <Route path="/nft" element={<Nft />} />
      </Routes>
    </>
  );
}

export default App;
