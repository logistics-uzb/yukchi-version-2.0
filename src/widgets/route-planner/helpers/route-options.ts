import { countries } from "@/shared/consts/countries";

export const countryOptions = countries.map((country) => ({
  label: country.name,
  value: country.id,
}));

export function getRegionOptions(countryId: string) {
  return (
    countries
      .find((country) => country.id === countryId)
      ?.regions.map((region) => ({
        label: region.name,
        value: region.id,
      })) ?? []
  );
}
