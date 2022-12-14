import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Nft from './pages/Nft';
import Token from './pages/token';
import { useEffect, useState } from 'react';
import Web3 from 'web3'
import Home from './pages/Home';
import CryptoTicker from './components/CryptoTicker';
import Footer from './components/Footer'


function App() {

  const [tokens, setTokens] = useState([]);
  const [web3, setWeb3] = useState();

  useEffect(() => {
    fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org')
      .then(res => res.json())
      .then(data => {
        const spliced = data.tokens.splice(0, 264)
        setTokens(spliced)
      })
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
      <CryptoTicker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swap" element={<Swap tokens={tokens} user={userObj} />} />
        <Route path="/pools" element={<Pools userObj={userObj} web3={web3} />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/token" element={<Token />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
