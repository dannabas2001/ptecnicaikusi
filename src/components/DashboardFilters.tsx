import { useDashboardContext } from "../hooks/useDashboardContext";
import type { ChangeEvent } from "react";
import { FaGlobe, FaCity, FaBuilding } from "react-icons/fa";
import type { City, Country, Office } from "../types/dashboardTypes";

export const DashboardFilters = () => {
  const {
    countries,
    selectedCountryId,
    selectCountry,
    selectedCityId,
    selectCity,
    selectedOfficeId,
    selectOffice,
  } = useDashboardContext();

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) =>
    selectCountry(Number(e.target.value));
  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) =>
    selectCity(Number(e.target.value));
  const handleOfficeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    selectOffice(Number(e.target.value));

  const selectedCountry = countries.find(
    (country: Country) => country.id === selectedCountryId
  );
  const cities = selectedCountry ? selectedCountry.cities : [];
  const selectedCity = cities.find((city: City) => city.id === selectedCityId);
  const offices = selectedCity ? selectedCity.offices : [];

  const filterClass =
    "w-full flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-2xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 flex flex-row flex-wrap gap-3 md:gap-6 justify-center items-start md:items-end">
      {/* País */}
      <div className="flex flex-col flex-1 min-w-[120px] md:min-w-[160px]">
        <label className="mb-1 md:mb-2 font-semibold text-gray-700 flex items-center gap-1 text-sm md:text-base">
          <FaGlobe /> País
        </label>
        <select
          className={filterClass}
          value={selectedCountryId ?? ""}
          onChange={handleCountryChange}
        >
          <option value="">Todos</option>
          {countries.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ciudad */}
      <div className="flex flex-col flex-1 min-w-[120px] md:min-w-[160px]">
        <label className="mb-1 md:mb-2 font-semibold text-gray-700 flex items-center gap-1 text-sm md:text-base">
          <FaCity /> Ciudad
        </label>
        <select
          className={filterClass + " text-center"}
          value={selectedCityId ?? ""}
          onChange={handleCityChange}
          disabled={!selectedCountry}
        >
          <option value="">Todas</option>
          {cities.map((city: City) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Oficina */}
      <div className="flex flex-col flex-1 min-w-[120px] md:min-w-[160px]">
        <label className="mb-1 md:mb-2 font-semibold text-gray-700 flex items-center gap-1 text-sm md:text-base">
          <FaBuilding /> Oficina
        </label>
        <select
          className={filterClass}
          value={selectedOfficeId ?? ""}
          onChange={handleOfficeChange}
          disabled={!selectedCity}
        >
          <option value="">Todas</option>
          {offices.map((office: Office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
