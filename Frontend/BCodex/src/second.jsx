import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Legend from './legend.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Legend />
  </StrictMode>,
)
