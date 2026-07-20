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
  telegramWebApp.expand()

  if (telegramWebApp.isVersionAtLeast?.('8.0')) {
    try {
      telegramWebApp.requestFullscreen?.()
    } catch (error) {
      console.error('Fullscreen ochilmadi:', error)
    }
  }
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
