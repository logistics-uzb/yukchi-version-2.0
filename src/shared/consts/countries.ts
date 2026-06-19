import { routeData } from "./route-data";

export const countries = routeData.map((country) => ({
  id: country.indexedName,
  name: country.countryNameLat,
  alias: country.alias,
  alias_cyr: country.alias_cyr,
  regions: country.regions.map((region) => ({
    id: region.indexedName,
    name: region.name,
    alias: region.alias,
    alias_cyr: region.alias_cyr,
  })),
}));
