import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import type { Country, City, Office } from "../types/dashboardTypes";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const EmployeesDoughnut = () => {
  const dashboardContext = useContext(DashboardContext);

  if (
    !dashboardContext ||
    !dashboardContext.countries ||
    dashboardContext.countries.length === 0
  ) {
    return (
      <p className="text-center text-gray-500">No hay datos disponibles</p>
    );
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } =
    dashboardContext;

  // Si hay oficina seleccionada, mostramos texto
  if (selectedCountryId && selectedCityId && selectedOfficeId) {
    const country = countries.find((c: Country) => c.id === selectedCountryId);
    const city = country?.cities.find((c: City) => c.id === selectedCityId);
    const office = city?.offices.find((o: Office) => o.id === selectedOfficeId);

    if (office && city) {
      return (
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-500 font-semibold max-w-md mx-auto transform transition-transform duration-300 hover:scale-105">
          <p className="text-lg mb-2">
            En la oficina <span className="font-bold">{office.name}</span> de{" "}
            <span className="font-bold">{city.name}</span> hay
          </p>
          <p className="text-4xl font-extrabold text-blue-600">
            {office.employees}
          </p>
          <p className="text-lg mt-1">empleados</p>
        </div>
      );
    }
  }

  // Si no hay oficina seleccionada, mostramos gráfico
  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "";

  if (selectedCountryId) {
    const selectedCountry = countries.find(
      (country: Country) => country.id === selectedCountryId
    );
    if (selectedCountry) {
      if (selectedCityId) {
        const selectedCity = selectedCountry.cities.find(
          (city: City) => city.id === selectedCityId
        );
        if (selectedCity) {
          labels = selectedCity.offices.map((office: Office) => office.name);
          data = selectedCity.offices.map((office: Office) => office.employees);
          chartTitle = `Empleados por Oficina en ${selectedCity.name}`;
        }
      } else {
        labels = selectedCountry.cities.map((city: City) => city.name);
        data = selectedCountry.cities.map((city: City) =>
          city.offices.reduce((acc, office) => acc + office.employees, 0)
        );
        chartTitle = `Empleados por Ciudad en ${selectedCountry.name}`;
      }
    }
  } else {
    labels = countries.map((c) => c.name);
    data = countries.map((c) =>
      c.cities.reduce(
        (accCity, city) =>
          accCity +
          city.offices.reduce(
            (accOffice, office) => accOffice + office.employees,
            0
          ),
        0
      )
    );
    chartTitle = "Empleados por País";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Empleados",
        data,
        backgroundColor: [
          "rgba(16, 185, 129, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(168, 85, 247, 0.6)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      title: { display: true, text: chartTitle, font: { size: 18 } },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
