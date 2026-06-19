import { routeData } from "@/shared/consts/route-data";

export const getRegionName = (indexedName?: string | null) => {
  if (!indexedName) return "";

  for (const country of routeData) {
    const region = country.regions.find(
      (region) => region.indexedName === indexedName,
    );

    if (region) return region.name;
  }

  return indexedName;
};
