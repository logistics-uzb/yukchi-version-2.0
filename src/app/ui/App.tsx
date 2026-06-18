import { AppProvider } from '@/app/providers'
import { AppRouter } from '../routes'

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}
