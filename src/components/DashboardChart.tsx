import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import type { City, Country, Office } from "../types/dashboardTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DashboardChart = () => {
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

  const { countries, selectedCountryId, selectedCityId } = dashboardContext;

  // Si hay ciudad seleccionada, mostramos solo un texto con las oficinas de esa ciudad
  if (selectedCountryId && selectedCityId) {
    const selectedCountry = countries.find(
      (c: Country) => c.id === selectedCountryId
    );
    const selectedCity = selectedCountry?.cities.find(
      (city: City) => city.id === selectedCityId
    );

    if (selectedCity) {
      const officeNames = selectedCity.offices
        .map((office: Office) => office.name)
        .join(", ");
      return (
        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg mx-auto flex flex-col items-center justify-center text-center text-gray-500 font-semibold space-y-4 transform transition-all duration-500 hover:scale-105">
          <p className="text-lg">En</p>
          <p className="text-2xl font-bold text-blue-600">
            {selectedCity.name}
          </p>
          <p className="text-lg">hay oficinas en:</p>
          <p className="text-xl font-bold text-green-600">{officeNames}</p>
        </div>
      );
    }
  }

  // Si no hay ciudad seleccionada, seguimos con la gráfica de oficinas por país o ciudad
  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "";

  if (selectedCountryId) {
    const selectedCountry = countries.find(
      (c: Country) => c.id === selectedCountryId
    );
    if (selectedCountry) {
      chartTitle = `Cantidad de Oficinas por Ciudad en ${selectedCountry.name}`;
      labels = selectedCountry.cities.map((city) => city.name);
      data = selectedCountry.cities.map((city) => city.offices.length);
    }
  } else {
    chartTitle = "Cantidad de Oficinas por País";
    labels = countries.map((c) => c.name);
    data = countries.map((c) =>
      c.cities.reduce((acc, city) => acc + city.offices.length, 0)
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de Oficinas",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: chartTitle, font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <Bar data={chartData} options={options} />
    </div>
  );
};
