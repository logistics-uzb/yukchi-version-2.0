import { countries } from "@/shared/consts/countries";
import type { RoutePlannerValues } from "./types";

export const ROUTE_PLANNER_STORAGE_KEY = "route-planner-values";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getCountry(countryId?: string) {
  return countries.find((country) => country.id === countryId);
}

function isRegionInCountry(countryId?: string, regionId?: string) {
  if (!countryId || !regionId) return false;

  return Boolean(
    getCountry(countryId)?.regions.some((region) => region.id === regionId),
  );
}

export function normalizeRoutePlannerValues(
  values: RoutePlannerValues,
): RoutePlannerValues {
  const from_country = getCountry(values.from_country)
    ? values.from_country
    : undefined;
  const to_country = getCountry(values.to_country)
    ? values.to_country
    : undefined;
  const from_region = isRegionInCountry(from_country, values.from_region)
    ? values.from_region
    : undefined;
  const to_region = isRegionInCountry(to_country, values.to_region)
    ? values.to_region
    : undefined;

  return {
    from_country,
    from_region,
    to_country,
    to_region,
  };
}

export function getStoredRoutePlannerValues(): RoutePlannerValues {
  try {
    const storedValues = localStorage.getItem(ROUTE_PLANNER_STORAGE_KEY);
    if (!storedValues) return {};

    const parsedValues: unknown = JSON.parse(storedValues);
    if (!isRecord(parsedValues)) return {};

    return normalizeRoutePlannerValues({
      from_country:
        typeof parsedValues.from_country === "string"
          ? parsedValues.from_country
          : undefined,
      from_region:
        typeof parsedValues.from_region === "string"
          ? parsedValues.from_region
          : undefined,
      to_country:
        typeof parsedValues.to_country === "string"
          ? parsedValues.to_country
          : undefined,
      to_region:
        typeof parsedValues.to_region === "string"
          ? parsedValues.to_region
          : undefined,
    });
  } catch {
    return {};
  }
}

export function storeRoutePlannerValues(values: RoutePlannerValues) {
  try {
    const normalizedValues = normalizeRoutePlannerValues(values);
    const hasValue = Object.values(normalizedValues).some(Boolean);

    if (hasValue) {
      localStorage.setItem(
        ROUTE_PLANNER_STORAGE_KEY,
        JSON.stringify(normalizedValues),
      );
    } else {
      localStorage.removeItem(ROUTE_PLANNER_STORAGE_KEY);
    }
  } catch {
    // Route search still works if browser storage is blocked.
  }
}

export function clearRoutePlannerValues() {
  try {
    localStorage.removeItem(ROUTE_PLANNER_STORAGE_KEY);
  } catch {
    // Clearing the form should still work if browser storage is blocked.
  }
}
