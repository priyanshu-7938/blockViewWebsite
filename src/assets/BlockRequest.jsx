import { useState } from 'react';
import axios from 'axios';
import { BlockDisplay } from './BlockDisplay';


export function BlockRequest(){
  // const blockinput = document.getElementById("blockinput");
  const [blockData, updateBlockData] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
  async function getData(){
    if( isValid() ){
      const blockReq = document.getElementById("blockinput").value;
      if(!isNaN(parseInt(blockReq))){
        //check if it is a valid  no i.e. less than...the latest block
        const res = await axios.post(url,{
          "jsonrpc": "2.0",
          "method": "eth_blockNumber",
          "params": [],
          "id": -1
        }).then((data)=>{
          if(parseInt(data.data.result) >= blockReq){
            fetchBlockData(blockReq.toString());     
          }
          else{
            document.getElementById("blockinput").value='0';
            document.getElementById('button').classList.add('shake');
            setTimeout(()=>{
              document.getElementById('button').classList.remove('shake');
            },699);
            // alert("entered_block_hav_not_yet_mined");
          }
        });
      }
      else if(blockReq === 'latest' || blockReq === 'Latest' || blockReq === ''){
        fetchBlockData('latest');
      }
    }
    else{
      document.getElementById("blockinput").value='0';
      document.getElementById('button').classList.add('shake');
        setTimeout(()=>{
          document.getElementById('button').classList.remove('shake');
        },699);
      // alert("Enter a valid block.....");
    }
  }
  const fetchBlockData = async (blockNo) => {
      try {
        let hex;
        if(blockNo !=='latest'){
          const value = parseInt(blockNo);
          hex = '0x' + value.toString(16);
        }
        else{
          hex = 'latest';
        }          
        const response = await axios.post(url, {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: [
            hex,
            false
          ]
        });
        const data = response.data;
        updateBlockData(data);
        latestChecker(parseInt(data.result.number));
        // return data;
      } catch (error) {
        console.error(error);
        document.getElementById('button').classList.add('shake');
        setTimeout(()=>{
          document.getElementById('button').classList.remove('shake');
        },699);
      }
  };

  //validating the input...
  function isValid(){
    return !isNaN(parseInt(document.getElementById("blockinput").value)) || document.getElementById("blockinput").value === 'latest' || document.getElementById("blockinput").value === 'Latest' || document.getElementById("blockinput").value === '' ;
  }

  //updateing the state of navigation buttons.
  function updateButtons({genesis , latest}){
    if(!genesis){
      document.getElementById("left").classList.remove('disabled');
    }
    else{
      document.getElementById("left").classList.add('disabled');
    }
    if(!latest){
      document.getElementById("right").classList.remove('disabled');
    }
    else{
      document.getElementById("right").classList.add('disabled');
    }
  }
  // Working of buttons
  function prev(){
    document.getElementById("left").classList.add('hop');
    setTimeout(() => {
      document.getElementById("left").classList.remove('hop');
      document.getElementById("left").classList.add('disabled');
    }, 500);
    const last = parseInt(blockData.result.number);
    document.getElementById('blockinput').value = (last-1).toString();
    document.getElementById("right").classList.add('disabled');
    getData();      
  }
  function next(){
    document.getElementById("right").classList.add('hop');
    document.getElementById("left").classList.add('disabled');
    setTimeout(() => {
      document.getElementById("right").classList.remove('hop');
      document.getElementById("right").classList.add('disabled');
    }, 500);
    const last = parseInt(blockData.result.number);
    document.getElementById('blockinput').value = (last+1).toString();
    getData();
  }
  async function latestChecker(number){
    //accesssing the latest block
    const response = await axios.post(url,{
      "jsonrpc": "2.0",
      "method": "eth_blockNumber",
      "params": [],
      "id": 9
    });
    let lNo = parseInt(response.data.result);
    // checking genesis block
    let genesis = false;
    let latest = false;
    if(number==0){
      genesis = true;
    }
    else if(number== lNo){
      latest = true;
    }
    updateButtons({genesis , latest});
  }
  return(
      <>
        <div className='header'>
          <h1>Enter The Block number to explore</h1>
          <div className='flex'>
            <input type="text" id='blockinput' className='header--input' placeholder='Latest'/>
            <button id='button' className="header--button" onClick={getData}>Get Block</button>
          </div>
          <p>⟭latest⟬ for latest block</p>
          <div className='header--navi'>
            <img id='left' onClick={prev} className='disabled' src="left.png" alt="prev" />
            <img id='right' onClick={next} className ='disabled' src="right.png" alt="next" />
          </div>
        </div>
        {Object.keys(blockData).length != 0 && <BlockDisplay res = {blockData}/>}
      </>
  )
}