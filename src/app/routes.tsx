import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoadsPage } from '@/pages/loads'
import { StatisticsPage } from '@/pages/statistics'
import { UiPage } from '@/pages/ui'
import { AppLayout } from './ui/AppLayout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/loads',
        element: <LoadsPage />,
      },
      {
        path: '/statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/ui',
        element: <UiPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
