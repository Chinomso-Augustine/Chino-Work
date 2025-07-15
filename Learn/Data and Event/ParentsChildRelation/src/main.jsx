import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Promo from './promo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Promo />
  </StrictMode>,
)
