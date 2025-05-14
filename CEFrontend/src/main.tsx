import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NumberGenerator from './Components/AlienSelector.tsx'
import Header from './Components/Header.tsx'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router'
import AlienShower from './Components/AlienShower.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Header />
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<NumberGenerator />} />
            <Route path="/PickAlien" element={< AlienShower/>} />
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)
