import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { DashboardProvider } from './providers/DashboardProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AuthProvider>
      <DashboardProvider>
    <App />
    </DashboardProvider>
    </AuthProvider>
    
  </StrictMode>,
) 
