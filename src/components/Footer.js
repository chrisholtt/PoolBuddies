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
            
        
                    <li><a href="https://www.instagram.com/poolbuddiesrjelly/">Instagram</a></li>
                    <li><a href="https://en-gb.facebook.com/">Facebook</a></li>
                    <li><a href="https://bebo.com/">Bebo</a></li>
                    <li><a href="https://myspace.com/discover/featured">MySpace</a></li>
                    <li><a href="https://tinder.com/en-GB">Tinder</a></li>
                </ul>

            </div>

            <div className="footer-item">
                <h3>Where dem Devs at?</h3>

                <ul> 
                    <li><a href="https://linktr.ee/poolbuddies">LinkedIn</a></li>
                    <li><a href="https://github.com/chrisholtt/PoolBuddies">GitHub</a></li>
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
                    <li><a href="https://polygonscan.com/token/0x7db631592b994bdd2f080306a464042c6cefa002">View on Polygon</a></li>
                </ul>

            </div>

            <div className="footer-item">
                <h3>Contact</h3>
                <ul> 
                    <li>Email the team:</li>
                    <li><input type="email" placeholder="Email:" className="email-input"></input></li>
                </ul>

            </div>




            </div>

           
              
        </div>
        
        </>


    );
}

export default Footer;