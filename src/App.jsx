// import { useState } from 'react'
import { Block } from 'ethers'
import './App.css'
import { BlockRequest } from './assets/BlockRequest'
import { Navbar } from './assets/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <BlockRequest />
    </>
  )
}

export default App
