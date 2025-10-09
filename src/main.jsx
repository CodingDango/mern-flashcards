import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import OptionsMenuManagerProvider from './context/OptionsMenuManagerProvider'
import PopUpProvider from './context/PopUpProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OptionsMenuManagerProvider>
      <PopUpProvider>
        <App />
      </PopUpProvider>
    </OptionsMenuManagerProvider>
  </StrictMode>,
)
