import { useState, type ReactNode } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import type { Country } from "../types/dashboardTypes";

interface Props {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectCountry = (id: number | null) => {
    setSelectedCountryId(id);
    setSelectedCityId(null);
    setSelectedOfficeId(null);
  };

  const selectCity = (id: number | null) => {
    setSelectedCityId(id);
    setSelectedOfficeId(null);
  };

  const selectOffice = (id: number | null) => {
    setSelectedOfficeId(id);
  };

  return (
    <DashboardContext.Provider
      value={{
        countries,
        selectedCountryId,
        selectedCityId,
        selectedOfficeId,
        loading,
        error,
        setCountries,
        selectCountry,
        selectCity,
        selectOffice,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}