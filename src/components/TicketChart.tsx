import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import type { Country, City, Office } from "../types/dashboardTypes";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

export const TicketsPolarArea = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext || !dashboardContext.countries || dashboardContext.countries.length === 0) {
    return <p className="text-center text-gray-500">No hay datos disponibles</p>;
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } = dashboardContext;

  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "";

  if (selectedCountryId) {
    const selectedCountry = countries.find(c => c.id === selectedCountryId);
    if (selectedCountry) {
      if (selectedCityId) {
        const selectedCity = selectedCountry.cities.find(c => c.id === selectedCityId);
        if (selectedCity) {
          if (selectedOfficeId) {
            const selectedOffice = selectedCity.offices.find(o => o.id === selectedOfficeId);
            if (selectedOffice) {
              return (
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto text-center font-semibold text-gray-500">
                  En la <span className="font-bold">{selectedOffice.name}</span> de{" "}
                  <span className="font-bold">{selectedCity.name}</span> hay{" "}
                  <span className="font-bold text-xl">{selectedOffice.ticketsOpen}</span> tickets abiertos
                </div>
              );
            }
          } else {
            labels = selectedCity.offices.map(o => o.name);
            data = selectedCity.offices.map(o => o.ticketsOpen);
            chartTitle = `Tickets abiertos por Oficina en ${selectedCity.name}`;
          }
        }
      } else {
        labels = selectedCountry.cities.map(c => c.name);
        data = selectedCountry.cities.map(c =>
          c.offices.reduce((acc, o) => acc + o.ticketsOpen, 0)
        );
        chartTitle = `Tickets abiertos por Ciudad en ${selectedCountry.name}`;
      }
    }
  } else {
    labels = countries.map(c => c.name);
    data = countries.map(c =>
      c.cities.reduce((accC, c) => accC + c.offices.reduce((accO, o) => accO + o.ticketsOpen, 0), 0)
    );
    chartTitle = "Tickets abiertos por País";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tickets abiertos",
        data,
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(168, 85, 247, 0.6)"
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)"
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
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-6xl mx-auto my-4">
      <PolarArea data={chartData} options={options} />
    </div>
  );
};
