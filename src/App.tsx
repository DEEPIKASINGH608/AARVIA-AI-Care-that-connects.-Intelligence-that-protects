import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CareProvider } from '@/context/CareContext'
import { AppRoutes } from '@/routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CareProvider>
          <AppRoutes />
        </CareProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
