import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'

import Home from './pages/Home'
import Country from './pages/Country'

function App() {

  return (
    <BrowserRouter>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":countryId" element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
