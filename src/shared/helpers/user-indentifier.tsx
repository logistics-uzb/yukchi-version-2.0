import { useEffect } from "react";
import { usePostHog } from "@posthog/react";

export function PostHogUserIdentifier() {
  const posthog = usePostHog();
  const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

  useEffect(() => {
    if (!posthog || !telegramUser?.id) {
      return;
    }

    posthog.identify(`telegram_${telegramUser.id}`, {
      telegram_id: telegramUser.id,
      username: telegramUser.username,
      first_name: telegramUser.first_name,
      last_name: telegramUser.last_name,
      language_code: telegramUser.language_code,
    });
  }, [posthog, telegramUser]);

  return null;
}