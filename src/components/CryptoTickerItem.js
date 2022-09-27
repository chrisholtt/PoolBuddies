import React from "react";
import '../stylesheets/Ticker.css'


const CryptoTickerItem = ({name, price, change}) => {



    return(

        <>  
        <div className="item">
            <h3>{name}</h3>
            <h3>{change}%</h3>
        </div>

        
        </>
    ); 


}

export default CryptoTickerItem;