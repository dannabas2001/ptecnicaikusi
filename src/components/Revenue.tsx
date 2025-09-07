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
import type { Country, City, Office } from "../types/dashboardTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RevenueChart = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext || !dashboardContext.countries || dashboardContext.countries.length === 0) {
    return <p className="text-center text-gray-500">No hay datos disponibles</p>;
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } = dashboardContext;

  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "Revenue";

  if (selectedCountryId) {
    const selectedCountry = countries.find((c: Country) => c.id === selectedCountryId);
    if (selectedCountry) {
      if (selectedCityId) {
        const selectedCity = selectedCountry.cities.find((c: City) => c.id === selectedCityId);
        if (selectedCity) {
          if (selectedOfficeId) {
            const selectedOffice = selectedCity.offices.find((o: Office) => o.id === selectedOfficeId);
            if (selectedOffice) {
              return (
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto text-center font-semibold text-gray-500">
                  En la oficina <span className="font-bold">{selectedOffice.name}</span> de{" "}
                  <span className="font-bold">{selectedCity.name}</span> el revenue es{" "}
                  <span className="font-bold text-xl">${selectedOffice.revenue.toLocaleString()}</span>
                </div>
              );
            }
          } else {
            labels = selectedCity.offices.map((o: Office) => o.name);
            data = selectedCity.offices.map((o: Office) => o.revenue);
            chartTitle = `Revenue por Oficina en ${selectedCity.name}`;
          }
        }
      } else {
        labels = selectedCountry.cities.map((c: City) => c.name);
        data = selectedCountry.cities.map((c: City) =>
          c.offices.reduce((acc, o) => acc + o.revenue, 0)
        );
        chartTitle = `Revenue por Ciudad en ${selectedCountry.name}`;
      }
    }
  } else {
    labels = countries.map((c: Country) => c.name);
    data = countries.map((c: Country) =>
      c.cities.reduce((accC, c) => accC + c.offices.reduce((accO, o) => accO + o.revenue, 0), 0)
    );
    chartTitle = "Revenue por País";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: chartTitle, font: { size: 18 } },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-6xl mx-auto my-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};
