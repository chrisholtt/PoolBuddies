import { faHome } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Octopus from '../components/Octopus';
import '../stylesheets/Octopus.css'

const Home = () => {
    return (
        <>
        
        
        <div className="home-content">
            <Octopus/>
            <div className="title-div">
                <h1>PoolBuddies</h1>
                <i>Dive into the pool...</i>
                <div className="buttons">
                    <a href="swap"><button>Swap</button></a>
                    <a href="/pools"><button>Pools</button></a>
                </div>
            </div>
        </div>
        <div className="base-content">
            <h1>Enter the Lottery!</h1>
            <h6>Buy your ticket on Polygon</h6> 
            <a className='polygon-link' href='/pools'><img src="/static/polygon-symbol-black.svg" alt="" className='polygon'/></a>
        </div>
        </>
    

    )
}

export default Home;