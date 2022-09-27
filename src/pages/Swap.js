import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import file from '../utils/portal';
import TokenModal from '../components/TokenModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

const Swap = ({tokens, user}) => {
    


    // useEffect(() => {
    //     fetch(`https://api.coingecko.com/api/v3/coins/${tokenFrom}/market_chart/range?vs_currency=usd&from=1663589528&to=1664197935`)
    //     .then(res => res.json())
    //     .then(data => setTokens(data.tokens))
    //   })
    

    const qs = require('qs');
    const Web3 = require('web3');
    const BigNumber = require('bignumber.js');

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const handleClick = () => {
        const tok1 = tokenFrom;
        const tok2 = tokenTo;
        setTokenFrom(tok2)
        setTokenTo(tok1)
    }

    // Swap amount 
    const [fromAmount, setFromAmount] = useState(null);
    const [toAmount, setToAmount] = useState(null);

    // Tokem Modal Open
    const [tokenOpenFrom, setTokenOpenFrom] = useState(false);
    const [tokenOpenTo, setTokenOpenTo] = useState(false);

    const handleTokenModalTo = () => {
        setTokenOpenTo(prev => !prev);
    }
    const handleTokenModalFrom = () => {
        setTokenOpenFrom(prev => !prev);
    }

    // Token TO and FROM
    const [tokenFrom, setTokenFrom] = useState(null);
    const [tokenTo, setTokenTo] = useState(null);

    const handleTokenFromChange = (tokenObj) => {
        setTokenFrom(tokenObj);
    }
    const handleTokenToChange = (tokenObj) => {
        setTokenTo(tokenObj);
    }

    async function handlePriceEstimate() {
        if (!tokenFrom || !tokenTo) return
        let amount = fromAmount * 10 ** tokenFrom.decimals
        // console.log(amount)
        console.log("token from", tokenFrom)

        const params = {
            sellToken: tokenFrom.address,
            buyToken: tokenTo.address,
            sellAmount: amount
        }

        const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`)
        const priceJSON = await response.json();
        // console.log("fetching price", priceJSON)
        setToAmount(priceJSON.buyAmount / (10 ** tokenTo.decimals))
    }


    async function getQuote(account) {
        if (!tokenFrom || !tokenTo || !user) return

        // console.log("getting quote")

        let amount = fromAmount * 10 ** tokenFrom.decimals
        // console.log(amount)

        const params = {
            sellToken: tokenFrom.address,
            buyToken: tokenTo.address,
            sellAmount: amount,
            // takerAddress: account
        }
        const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`)
        const swapQuoteJSON = await response.json();

        setToAmount(swapQuoteJSON.buyAmount / (10 ** tokenTo.decimals))

        return swapQuoteJSON;
    }

    useEffect(() => {
      getQuote()
    }, [tokenFrom])
    

    async function trySwap() {

        // Pulls in any address / most recent used account.
        let accounts = await window.ethereum.request({ method: "eth_accounts" });
        console.log("window.eth", accounts[0]);
        console.log("user", user)

        let takerAddress = accounts[0];
        const swapQuoteJSON = await getQuote(takerAddress);
        console.log(swapQuoteJSON)

        // Set token allowance 
        const web3 = new Web3(Web3.givenProvider);
        const fromTokenAddress = tokenFrom.address;
        const erc20Abi = file;



    const ERC20TokenContract = new web3.eth.Contract(erc20Abi, fromTokenAddress);
    console.log("setup erc20 token contract: ", ERC20TokenContract);

    const maxApproval = new BigNumber(2).pow(256).minus(1);

    ERC20TokenContract.methods.approve(swapQuoteJSON.allowanceTarget, maxApproval)
        .send({ from: takerAddress })
        .then(tx => console.log("tx: ", tx))

    const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    console.log("receipt: ", receipt);

    
}


    return (
        <div className='swap-modal-wrapper'>
    
              <Box className='swap-modal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Token Swap
                        </Typography>

                        <Box className='swap-box'>
                            <input type="text" placeholder='0.0' onKeyDown={handlePriceEstimate} value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
                            <div onClick={handleTokenModalFrom} className='token-dropdown'>
                                {tokenFrom ? <img className='swapIMG' src={tokenFrom.logoURI}></img> : <h2>🔁</h2>}
                                <h2>{tokenFrom && tokenFrom.symbol}</h2>
                            </div>
                            {tokens.length && <TokenModal tokenOpen={tokenOpenFrom} handleTokenModal={handleTokenModalFrom} tokens={tokens} handleTokenFromChange={handleTokenFromChange} />}
                        </Box>
                        {!isHovering &&
                        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}><FontAwesomeIcon icon={faArrowDown}/></div>
                    }{isHovering &&
                        <button className='token-button' onMouseOut={handleMouseOut} onClick={handleClick}><FontAwesomeIcon icon={faArrowsUpDown} /></button>
                     }
                        

                        <Box className='swap-box'>
                            <input type="text" placeholder='0.0' value={toAmount} />
                            <div onClick={handleTokenModalTo} className='token-dropdown'>
                            {tokenTo ? <img className='swapIMG' src={tokenTo.logoURI}></img> : <h2>🔁</h2>}
                                <h2>{tokenTo && tokenTo.symbol}</h2>
                            </div>
                            {tokens.length && <TokenModal tokenOpen={tokenOpenTo} handleTokenModal={handleTokenModalTo} tokens={tokens} handleTokenFromChange={handleTokenToChange} />}
                        </Box>

                        <button disabled={!user} onClick={trySwap}>SWAP</button>
                    </Box>
        </div>

    )
}

export default Swap