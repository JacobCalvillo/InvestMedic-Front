import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Login } from '../../features/auth/pages/LoginPage.tsx'
import { Register } from '../../features/auth/pages/RegisterPage.tsx'
import { MainRenderer } from '../../pages/MainRenderer.tsx'
import { Patient } from '../../features/patients/pages/PatientPage.tsx'
import { Appointment } from '../../features/appointments/pages/AppointmentPage.tsx'
import Success from '../../features/appointments/pages/SuccessPage.tsx'
import { ModeToggle } from '../../components/mode-toggle.tsx';
import ErrorPage from '../../pages/error-page.tsx'
import UserPage from '../../features/dashboard/pages/UserPage.tsx'
import '../../index.css'
import App from '../../App.tsx'
import { UserProvider } from '@/shared/hooks/user-provider.tsx'
import { MobileProvider } from "@/components/MobileProvider.tsx";
import ProtectedRoute from "@/components/ProtectedRoutes.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" /> // Redirigir automáticamente a /register
  },
  { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
  {path: '/register', element: <Register/>, errorElement: <ErrorPage/>},
  {
    element: <ProtectedRoute/>,
    children: [
      {path: '/patient/register', element: <Patient/>, errorElement: <ErrorPage/>},
      {path: '/main', element: <MainRenderer/>, errorElement: <ErrorPage/>},
      {path: '/appointment', element: <Appointment/>, errorElement: <ErrorPage/>},
      {path: '/success', element: <Success/>, errorElement: <ErrorPage/>},
      {path: '/user/page', element: <UserPage/>, errorElement: <ErrorPage/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MobileProvider>
        <UserProvider>
          <App>
            <RouterProvider router={router} />
            <ModeToggle />
          </App>
        </UserProvider>
      </MobileProvider>
    </StrictMode>
)
