export const formatDistanceDuration = (minutes: number): string => {
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const mins = minutes % 60;

  const parts: string[] = [];

  if (days) parts.push(`${days} kun`);
  if (hours) parts.push(`${hours} soat`);
  if (mins || parts.length === 0) parts.push(`${mins} daqiqa`);

  return parts.join(" ");
};
