import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import CryptoTickerItem from "./CryptoTickerItem";
import '../stylesheets/Ticker.css'

const CryptoTicker = () => {


    const [tokens, setTokens] = useState([]);

        useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => setTokens(data))
        console.log(tokens.symbol);
        console.log(tokens.current_price);
        console.log(tokens.price_change_percentage_24h)
      })


      const tickerNodes = tokens.map((tickerObject, index) => {

        return(
            <CryptoTickerItem
            className="item"
            key={index} 
            name={tickerObject.symbol}
            price={tickerObject.current_price}
            change={tickerObject.price_change_percentage_24h}
            />
        )
      })

    return (
                
        
            <Marquee gradientColor={[245, 240, 218]} pauseOnHover={true} className="ticker">
                {tickerNodes}
            </Marquee>
    
    )
}

export default CryptoTicker;