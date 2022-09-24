import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Swap from './pages/Swap';
import Pools from './pages/Pools';
import Nft from './pages/Nft';
import { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from "react-moralis";


function App() {

  const Web3Api = useMoralisWeb3Api();

  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0.0);

  const handleUserSignIn = (address) => {
    setUserAddress(address);
  }


  const fetchTokenBalances = async () => {
    const balances = await Web3Api.account.getTokenBalances();
    const response = await balances[0]

    if (response.symbol === "MATIC") {
      let balance = response.balance / 10 ** response.decimals
      setUserBalance(balance.toFixed(2))
    }
  };

  fetchTokenBalances()





  return (
    <>
      <Navbar handleUserSignIn={handleUserSignIn} userAddress={userAddress} userBalance={userBalance} />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/pools" element={<Pools />} />
        <Route path="/nft" element={<Nft />} />
      </Routes>

    </>
  );
}

export default App;
