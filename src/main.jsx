import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// svg filter in backdrop-filter only works in chrome
const isChromium = navigator.userAgentData?.brands?.some((b) => /Chromium/i.test(b.brand))
if (isChromium) document.documentElement.classList.add('lg-distort')

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
