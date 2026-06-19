type RelativeTimeUnit =
  | "daqiqa"
  | "soat"
  | "kun"
  | "oy"
  | "yil";

interface RelativeTime {
  value: number;
  unit: RelativeTimeUnit;
}

export function timeAgo(date: string | Date): RelativeTime {
  const now = Date.now();
  const target = new Date(date).getTime();

  const diffInMinutes = Math.floor((now - target) / 1000 / 60);

  if (diffInMinutes < 60) {
    return {
      value: diffInMinutes,
      unit: "daqiqa",
    };
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return {
      value: diffInHours,
      unit: "soat",
    };
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return {
      value: diffInDays,
      unit: "kun",
    };
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return {
      value: diffInMonths,
      unit: "oy",
    };
  }

  return {
    value: Math.floor(diffInMonths / 12),
    unit: "yil",
  };
}