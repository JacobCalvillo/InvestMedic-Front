import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/LoginPage.tsx'
import { Register } from './pages/RegisterPage.tsx'
import { MainRenderer } from './pages/MainRenderer.tsx'
import { Patient } from './pages/PatientPage.tsx'
import { Appointment } from './pages/AppointmentPage.tsx'
import Success from './pages/SuccessPage.tsx'
import ModeToggle from './components/mode-toggle.tsx'
import ErrorPage from './pages/error-page.tsx'
import Paypage from './pages/PayPage.tsx'
import UserPage from './pages/UserPage.tsx'
import './index.css'
import App from './App.tsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe, StripeElementsOptionsClientSecret } from '@stripe/stripe-js'
import { UserProvider } from '@/hooks/user-provider.tsx'
import { getStripeClientSecret } from './services/stripeService.ts'

// Función asíncrona inmediatamente invocada
(async () => {
  const stripePromise: Promise<Stripe | null> = loadStripe(import.meta.env.VITE_STRIPE_PK as string)

  const client = await getStripeClientSecret(5000, 'mxn')
  console.log(client)
  const clientOptions: StripeElementsOptionsClientSecret = {
    clientSecret: client,
    appearance: { theme: 'night', labels: 'floating' }
  }

  const router = createBrowserRouter([
    { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
    { path: '/register', element: <Register />, errorElement: <ErrorPage /> },
    { path: '/patient/register', element: <Patient />, errorElement: <ErrorPage /> },
    { path: '/main', element: <MainRenderer />, errorElement: <ErrorPage /> },
    {
      path: '/appointment',
      element: client && stripePromise ? (
          <Elements stripe={stripePromise} options={clientOptions}>
            <Appointment />
          </Elements>
      ) : (
          <p>Error cargando Stripe...</p>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/payment/checkout',
      element: client ? (
          <Elements stripe={stripePromise} options={clientOptions}>
            <Paypage />
          </Elements>
      ) : (
          <p>Cargando...</p>
      ),
      errorElement: <ErrorPage />,
    },
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
