import type { PropsWithChildren } from 'react'
import { AntProvider } from '../ant-provider'
import { PostHogProvider } from '../posthog-provider'
import { StoreProvider } from '../store-provider'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <PostHogProvider>
      <StoreProvider>
        <AntProvider>{children}</AntProvider>
      </StoreProvider>
    </PostHogProvider>
  )
}
