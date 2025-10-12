import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import OptionsMenuManagerProvider from './context/OptionsMenuManagerProvider'
import ModalProvider from './context/ModalProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OptionsMenuManagerProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </OptionsMenuManagerProvider>
  </StrictMode>,
)
