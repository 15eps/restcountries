import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'

import Home from './pages/Home'
import Country from './pages/Country'
import Quiz from './pages/Quiz'

function App() {

  return (
    <BrowserRouter>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path=":countryId" element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App