import type { PropsWithChildren } from 'react'
import { AntProvider } from '../ant-provider'
import { StoreProvider } from '../store-provider'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <AntProvider>{children}</AntProvider>
    </StoreProvider>
  )
}
