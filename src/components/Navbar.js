import React from 'react'
import { useMoralis } from "react-moralis";
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'



const Navbar = ({ userAddress, handleUserSignIn, userBalance }) => {

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
        if (isAuthenticated) {
            // add your logic here
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = async () => {
        await authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
                console.log("logged in user:", user);
                handleUserSignIn(user.get("ethAddress"));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const logOut = async () => {
        await logout();
        handleUserSignIn("");
        console.log("logged out");
    }

    const UserAddressString = () => {
        if (userAddress) {
            return `${userAddress[0]}${userAddress[1]}${userAddress[2]}${userAddress[3]}...${userAddress[userAddress.length - 4]}${userAddress[userAddress.length - 3]}${userAddress[userAddress.length - 2]}${userAddress[userAddress.length - 1]}`
        }
    }





    return (
        <nav className='navbar'>
            <ul>
                <div>
                    <li><NavLink to="/" style={{ textDecoration: 'none', display: "flex", alignItems: "center" }}><img src="/static/pool-logo.svg" alt="pool-logo" className='pool-logo' /><h1>PoolBuddies</h1></NavLink></li>
                    <li><NavLink to="/swap" activeClassName="active" style={{ textDecoration: 'none' }}><h1>Swap</h1></NavLink></li>
                    <li><NavLink to="/pools" style={{ textDecoration: 'none' }}><h1>Pools</h1></NavLink></li>
                    <li><NavLink to="/nft" style={{ textDecoration: 'none' }}><h1>NFT</h1></NavLink></li>
                </div>
            </ul>

            <FontAwesomeIcon icon={faGear} />
            <ul>
                <div>
                    {userAddress ?
                        <div>
                            <div className='connected-symbol'></div>
                            <img src="/static/polygon-symbol.svg" alt="" className='polygon-symbol' />
                            <h2>{userBalance}</h2>
                            <button onClick={logOut} disabled={isAuthenticating} className="connect-btn" ><UserAddressString /></button>
                        </div>
                        :
                        <div>
                            <button className="connect-btn" onClick={login}>Connect Wallet</button>
                        </div>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default Navbar