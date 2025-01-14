import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NumberGenerator from './Boxes.tsx'
import InfoCard from './AlienCard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <App />
        <NumberGenerator />
  </StrictMode>,
)
