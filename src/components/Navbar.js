import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'



const Navbar = ({ userObj, handleUserSignIn, onConnect, disconnectUser }) => {


    const UserAddressString = () => {
        if (userObj) {
            return `${userObj.address[0]}${userObj.address[1]}${userObj.address[2]}${userObj.address[3]}...${userObj.address[userObj.address.length - 4]}${userObj.address[userObj.address.length - 3]}${userObj.address[userObj.address.length - 2]}${userObj.address[userObj.address.length - 1]}`
        }
    }

    return (
        <nav className='navbar'>
            <ul>
                <div>
                    <li><NavLink to="/" className="navlink" style={{ textDecoration: 'none', display: "flex", alignItems: "center", color: "#000000" }}><img src="/static/buddie-logo.svg" alt="logo" className='logo' /><h1>PoolBuddies</h1></NavLink></li>
                    <li><NavLink to="/swap" activeClassName="active" style={{ textDecoration: 'none', color: "#000000" }}><h1>Swap</h1></NavLink></li>
                    <li><NavLink to="/pools" style={{ textDecoration: 'none', color: "#000000" }}><h1>Pools</h1></NavLink></li>
                    <li><NavLink to="/nft" style={{ textDecoration: 'none', color: "#000000" }}><h1>NFT</h1></NavLink></li>
                </div>
            </ul>

            <ul>
                <div>
                    <li>
                        <FontAwesomeIcon icon={faGear} />
                    </li>
                    {userObj.isConnected ?
                        <div>

                            <div>
                                <img src="/static/polygon-symbol-black.svg" alt="" className='polygon-symbol' />
                                <h2>{userObj.balance}</h2>
                            </div>
                            <li>
                                <div className='connected-symbol'></div>
                            </li>
                            <button onClick={() => disconnectUser()} className="connect-btn" >
                                <FontAwesomeIcon icon={faWallet} />
                                <UserAddressString />
                            </button>
                        </div>

                        :
                        <li>
                            <div>
                                <button className="connect-btn" onClick={onConnect}>Connect Wallet</button>
                            </div>
                        </li>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default Navbar