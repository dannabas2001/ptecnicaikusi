
export interface Office {
  id: number;
  name: string;
  employees: number;
  revenue: number;
  tickets: number;
}

export interface City {
  id: number;
  name: string;
  offices: Office[];
}

export interface Country {
  offices: Office[];
  id: number;
  name: string;
  cities: City[];
}
export type DashboardContextType = {
    countries: Country[];
    setCountries: (value: Country[]) => void;
    selectedCountryId: number | null;
    selectedCityId: number | null;
    selectedOfficeId: number | null;
    filteredCities: City[];
    filteredOffices: Office[];
    loading: boolean;
    error: string | null;
    loadCountries: () => Promise<void>;
    selectCountry: (id: number) => void;
    selectCity: (id: number) => void;
    selectOffice: (id: number) => void;
    updateMetrics: () => void;
};
