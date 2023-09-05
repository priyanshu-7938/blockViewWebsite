import React from "react";


export function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <img src="logo.png" alt="Logo" width="40" height="40"/>
            <h1>eth_block_explorer <span>This page views the Ganache blocks from Ethereum Testnet.</span></h1>
            <a href="https://etherscan.io/" target="blank">eth_official_explorer</a>
        </nav>
    )
}