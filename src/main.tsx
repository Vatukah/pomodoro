import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { TomatoProvider } from './context/tomatoProvider.tsx'
import PomodoroProvider from './context/pomodoroProvider.tsx'
import ModalProvider from './context/modalProvider.tsx'
import ThemeProvider from './context/themeProvider.tsx'
import { BootProvider } from './context/bootProvider.tsx'
import { SettingsHydrationGate } from './components/SettingHydrationGate.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BootProvider>
      <ThemeProvider>
      
          <PomodoroProvider>
            <TomatoProvider>
              <ModalProvider>
                <SettingsHydrationGate/>
                <App />
              </ModalProvider>
            </TomatoProvider>
          </PomodoroProvider>
       
      </ThemeProvider>
    </BootProvider>
  </StrictMode>,
)
