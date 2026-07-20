import { PostHogProvider as PostHogReactProvider } from '@posthog/react'
import type { PropsWithChildren } from 'react'
import type { PostHogConfig } from 'posthog-js'

const POSTHOG_PROJECT_TOKEN = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN

const posthogOptions = {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  defaults: '2026-05-30',
} satisfies Partial<PostHogConfig>

export function PostHogProvider({ children }: PropsWithChildren) {
  if (!POSTHOG_PROJECT_TOKEN) {
    return children
  }

  return (
    <PostHogReactProvider
      apiKey={POSTHOG_PROJECT_TOKEN}
      options={posthogOptions}
    >
      {children}
    </PostHogReactProvider>
  )
}
