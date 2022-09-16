import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'

import Home from './pages/Home'
import Country from './pages/Country'
import { ThemeProvider } from "./context/theme";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":countryId" element={<Country />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
