export function getPhoneUrl(phone?: string) {
  if (!phone) return undefined;

  const normalizedPhone = phone.trim().replace(/[^\d+*#,;]/g, "");
  return normalizedPhone ? `tel:${normalizedPhone}` : undefined;
}
