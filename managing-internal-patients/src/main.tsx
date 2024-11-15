import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login.tsx'
import { Register } from './pages/Register.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Patient } from './pages/Patient.tsx'
import { Appointment } from './pages/Appointment.tsx'
import Success  from './pages/Success.tsx'
import ModeToggle from './components/mode-toggle.tsx'
import ErrorPage from './pages/error-page.tsx'
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/patient/register',
    element: <Patient />,
    errorElement: <ErrorPage />,
  },
  {
    path:'/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/appointment',
    element: <Appointment />,
    errorElement: <ErrorPage />,
  },
  {
    path:'/success',
    element: <Success />,
    errorElement: <ErrorPage />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <div className='bg-zinc-900'>
        <RouterProvider router={router} />
          <ModeToggle />
      </div>
    </App>
    
  </StrictMode>,
)
