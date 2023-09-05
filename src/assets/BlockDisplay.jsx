import { useState } from "react";
import axios from "axios";

export function BlockDisplay({ res }){
    const [gwei,updateGwei] = useState(0);
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
    const data = res.result;
    //calculating the block reward
    const reward = parseInt(data.gasUsed)/parseInt(data.gasLimit);
    //getting the value og gwei;
    async function getPrice(){
        const res = await axios.post(url,{
            "jsonrpc": "2.0",
            "method": "eth_gasPrice",
            "params": [],
            "id": 77
        }).then((el)=>{
            updateGwei(parseInt(el.data.result)/1000000000);
        })
    }
    getPrice();
    
    return (
        <div className="body">

            <div>
                <p className="label">Block height</p>
                <p className="value">{parseInt(data.number)}</p>

                <p className="label">Timestamp</p>
                <p className="value">{parseInt(data.timestamp)}</p>

                <p className="label">Transaction details</p>
                <p className="value">{data.transactions.length} transaction(s)</p>

                <p className="label">Mined By</p>
                <p className="value">{data.miner}</p>

                <p className="label">BLock reward</p>
                <p className="value">{reward*gwei+2} ETH</p>

                <p className="label">Difficulty</p>
                <p className="value">{parseInt(data.difficulty)}</p>

                <p className="label">Total difficulty</p>
                <p className="value">{parseInt(data.totalDifficulty)}</p>

                <p className="label">Gas Used</p>
                <p className="value">{parseInt(data.gasUsed)}</p>

                <p className="label">Gas Limit</p>
                <p className="value">{parseInt(data.gasLimit)}</p>
            </div>

            <div className="diff">
                <p className="label">Hash</p>
                <p className="value">{data.hash}</p>
                
                <p className="label">ParentHash</p>
                <p className="value">{data.parentHash}</p>

                <p className="label">Sha3Uncles</p>
                <p className="value">{data.sha3Uncles}</p>

                <p className="label">StateRoot</p>
                <p className="value">{data.stateRoot}</p>
                
                <p className="label">Nonce</p>
                <p className="value">{parseInt(data.nonce)}</p>
            </div>
        </div>
    )
}