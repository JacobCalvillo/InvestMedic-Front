
import { createBrowserRouter } from 'react-router-dom'
import { Login } from './pages/LoginPage.tsx'
import { Register } from './pages/RegisterPage.tsx'
import { MainRenderer } from './pages/MainRenderer.tsx'
import { Patient } from './pages/PatientPage.tsx'
import { Appointment } from './pages/AppointmentPage.tsx'
import Success  from './pages/SuccessPage.tsx'
import ErrorPage from './pages/error-page.tsx'
import Paypage from './pages/PayPage.tsx'
import UserPage from './pages/UserPage.tsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { getStripeClientSecret } from './services/stripeService.ts'

const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PK as string);
const client = await getStripeClientSecret(5000, 'mxn');
    const options = {
      clientSecret: client as string,
      appearance: {
        theme: 'stripe' as const
      }
    }

console.log(options)


export const router = createBrowserRouter([
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
    path:'/main',
    element: <MainRenderer />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/appointment',
    element: 
        <Elements stripe={stripePromise} options={options}>
          <Appointment />
        </Elements>,
    errorElement: <ErrorPage />,
  },
  {
    path:'/success',
    element: <Success />,
    errorElement: <ErrorPage />,
  },
  {
    path:'/payment/checkout',
    element: 
    <Elements stripe={stripePromise} options={options}>
      <Paypage  />
    </Elements>,
    errorElement: <ErrorPage />,
  },
  {
    path:'/user/page',
    element: <UserPage />,
    errorElement: <ErrorPage />,
  }
])