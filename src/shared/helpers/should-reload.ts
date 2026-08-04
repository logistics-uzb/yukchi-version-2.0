const LAST_RELOAD_DATE_KEY = "last-reload-date";
const RELOAD_INTERVAL_IN_DAYS = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function shouldReload(currentDate = new Date()): boolean {
  const lastReloadDate = localStorage.getItem(LAST_RELOAD_DATE_KEY);

  if (!lastReloadDate) {
    localStorage.setItem(LAST_RELOAD_DATE_KEY, currentDate.toISOString());
    return false;
  }

  const lastReloadTime = new Date(lastReloadDate).getTime();
  const currentTime = currentDate.getTime();

  if (!Number.isFinite(lastReloadTime) || currentTime < lastReloadTime) {
    localStorage.setItem(LAST_RELOAD_DATE_KEY, currentDate.toISOString());
    return false;
  }

  const differenceInDays = (currentTime - lastReloadTime) / MS_IN_DAY;

  if (differenceInDays >= RELOAD_INTERVAL_IN_DAYS) {
    localStorage.setItem(LAST_RELOAD_DATE_KEY, currentDate.toISOString());
    return true;
  }

  return false;
}
