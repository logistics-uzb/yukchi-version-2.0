export const regionDetector = (region: string | null) => {
  switch (region) {
    case "uzbekistan":
      return "uz";
    case "russia":
      return "ru";
    case "kazakhstan":
      return "kz";
    case "tajikistan":
      return "tj";
    case "kyrgyzstan":
      return "kg";
    case "belarus":
      return "by";
    case "turkey":
      return "tr";
    default:
      return "";
  }
};
