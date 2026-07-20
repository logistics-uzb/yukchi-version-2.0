import { useEffect, type PropsWithChildren } from 'react'
import { AntProvider } from '../ant-provider'
import { PostHogProvider } from '../posthog-provider'
import { StoreProvider } from '../store-provider'

let isTelegramWebAppInitialized = false

function initTelegramWebApp() {
  if (isTelegramWebAppInitialized) {
    return
  }

  const telegramWebApp = window.Telegram?.WebApp

  if (!telegramWebApp) {
    return
  }

  isTelegramWebAppInitialized = true

  telegramWebApp.ready()
  telegramWebApp.expand?.()
  telegramWebApp.requestFullscreen?.()
  telegramWebApp.disableVerticalSwipes?.()
}

export function AppProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    initTelegramWebApp()
  }, [])

  return (
    <PostHogProvider>
      <StoreProvider>
        <AntProvider>{children}</AntProvider>
      </StoreProvider>
    </PostHogProvider>
  )
}
