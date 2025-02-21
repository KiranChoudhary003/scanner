import React from 'react'
import Scanner from './components/Scanner'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScanResult from './components/ScanResult'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Scanner />} />
        <Route path='/result/:status' element = {<ScanResult />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
