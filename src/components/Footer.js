import React from "react";




const Footer = () => {



    return(

        <>

        <div className="footer">
            <div className="footer-title">
                <img src="/static/buddie-logo.svg" alt="logo" className='logo' />
                <h1>PoolBuddies</h1>
            </div>


            <div  className="footer-flex ">
            <div className="footer-item">
                <h3>Stay Connected</h3>

                <ul> 
            
        
                    <li><a href="">Instagram</a></li>
                    <li><a href="">Facebook</a></li>
                    <li><a href="">Bebo</a></li>
                    <li><a href="">MySpace</a></li>
                    <li><a href="">Tinder</a></li>
                </ul>

            </div>

            <div className="footer-item">
                <h3>Where dem Devs at?</h3>

                <ul> 
                    <li><a href=""></a>LinkedIn</li>
                    <li><a href="">GitHub</a></li>
                </ul>

            </div>

            <div className="footer-item">
                <h3>Road Map</h3>
                <ul> 
                    <li><a href="">Next Steps</a></li>
                    <li><a href="">ReadMe</a></li>
                </ul>

            </div>


            <div className="footer-item">
                <div className="rjelly">
                    <h3 >Royal Jelly</h3>
                    <img className="coin" src="/static/RJellyCoin.png" width={40}></img>
                </div>
                <ul> 
                    <li><a href="">About</a></li>
                    <li><a href="https://polygonscan.com/token/0xf5bf6ef2afb00f3a62ed11c9b1e7200470c230e5">View on Polygon</a></li>
                </ul>

            </div>

            <div className="footer-item">
                <h3>Contact</h3>
                <ul> 
                    <li>Email the team:</li>
                    <li><input type="email" placeholder="Email:"></input></li>
                </ul>

            </div>




            </div>

           
              
        </div>
        
        </>


    );
}

export default Footer;