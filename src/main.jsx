import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// The SVG-refraction variant of the glass only renders correctly in Chromium;
// Safari & Firefox keep the regular frosted blur.
const isChromium = navigator.userAgentData?.brands?.some((b) => /Chromium/i.test(b.brand))
if (isChromium) document.documentElement.classList.add('lg-distort')

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
