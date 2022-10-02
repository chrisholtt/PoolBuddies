import React, {useState} from "react";
import '../stylesheets/Ticker.css'


const CryptoTickerItem = ({name, price, change}) => {



    return(

        <>  
        <div className="item">
            <h3>{name.toUpperCase()}</h3>
            <h3 className={change > 0 ? "green" : "red" }>{change}%</h3>
        </div>

        
        </>
    ); 


}

export default CryptoTickerItem;