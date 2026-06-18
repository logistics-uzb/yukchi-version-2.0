import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoadsPage } from '@/pages/loads'
import { UiPage } from '@/pages/ui'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/loads',
    element: <LoadsPage />,
  },
  {
    path: '/ui',
    element: <UiPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
