import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/LoginPage.tsx'
import { Register } from './pages/RegisterPage.tsx'
import { MainRenderer } from './pages/MainRenderer.tsx'
import { Patient } from './pages/PatientPage.tsx'
import { Appointment } from './pages/AppointmentPage.tsx'
import Success from './pages/SuccessPage.tsx'
import { ModeToggle } from './components/mode-toggle.tsx';
import ErrorPage from './pages/error-page.tsx'
import UserPage from './pages/UserPage.tsx'
import './index.css'
import App from './App.tsx'
import { UserProvider } from '@/hooks/user-provider.tsx'

// Función asíncrona inmediatamente invocada
(async () => {


  const router = createBrowserRouter([
    { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
    { path: '/register', element: <Register />, errorElement: <ErrorPage /> },
    { path: '/patient/register', element: <Patient />, errorElement: <ErrorPage /> },
    { path: '/main', element: <MainRenderer />, errorElement: <ErrorPage /> },
    { path: '/appointment', element:  <Appointment />, errorElement: <ErrorPage /> },
    { path: '/success', element: <Success />, errorElement: <ErrorPage /> },
    { path: '/user/page', element: <UserPage />, errorElement: <ErrorPage /> },
  ])

  createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <UserProvider>
          <App>
            <RouterProvider router={router} />
            <ModeToggle />
          </App>
        </UserProvider>
      </StrictMode>
  )
})()
