import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type TooltipItem,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useContext } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import type { City, Country, Office } from "../../types/dashboardTypes";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

export const TicketsPolarArea = () => {
  const dashboardContext = useContext(DashboardContext);

  if (
    !dashboardContext ||
    !dashboardContext.countries ||
    dashboardContext.countries.length === 0
  ) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">
          No hay datos de tickets disponibles
        </p>
      </div>
    );
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } =
    dashboardContext;

  // Si hay oficina seleccionada → mostramos solo tarjeta con texto
  if (selectedCountryId && selectedCityId && selectedOfficeId) {
    const country = countries.find((c: Country) => c.id === selectedCountryId);
    const city = country?.cities.find((c: City) => c.id === selectedCityId);
    const office = city?.offices.find((o: Office) => o.id === selectedOfficeId);

    if (office && city) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Tickets Abiertos
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">{office.name}</span> • {city.name}
          </p>
          <div className="text-3xl font-light text-gray-900 mb-2">
            {office.tickets.toLocaleString()}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs. promedio del sector</p>
        </div>
      );
    }
  }

  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "Tickets";

  if (selectedCountryId) {
    const country = countries.find((c) => c.id === selectedCountryId);
    if (country) {
      if (selectedCityId) {
        const city = country.cities.find((c) => c.id === selectedCityId);
        if (city) {
          labels = city.offices.map((o) => o.name);
          data = city.offices.map((o) => o.tickets);
          chartTitle = `Tickets • ${city.name}`;
        }
      } else {
        labels = country.cities.map((c) => c.name);
        data = country.cities.map((c) =>
          c.offices.reduce((acc, o) => acc + o.tickets, 0)
        );
        chartTitle = `Tickets • ${country.name}`;
      }
    }
  } else {
    labels = countries.map((c) => c.name);
    data = countries.map((c) =>
      c.cities.reduce(
        (accC, city) =>
          accC + city.offices.reduce((accO, o) => accO + o.tickets, 0),
        0
      )
    );
    chartTitle = "Tickets Global";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tickets abiertos",
        data,
        backgroundColor: [
          "rgba(234, 179, 8, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(99, 102, 241, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(234, 179, 8, 0.3)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 8,
        callbacks: {
          title: function (context: TooltipItem<"polarArea">[]) {
            return context[0].label;
          },
          label: function (context: TooltipItem<"polarArea">) {
            const total = context.dataset.data.reduce(
              (a, b) => (a as number) + (b as number),
              0
            ) as number;
            const percentage = ((context.parsed.r / total) * 100).toFixed(1);
            return `${context.parsed.r.toLocaleString()} tickets (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        angleLines: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        pointLabels: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const total = data.reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="flex-shrink-0 mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-800">{chartTitle}</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Distribución de tickets abiertos por región
        </p>
      </div>

      {/* Contenedor responsivo */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 items-start md:items-center">
        {/* Chart Container */}
        <div className="flex-1 min-w-[250px] max-w-[400px] flex justify-center items-center relative min-h-[200px]">
          <PolarArea data={chartData} options={options} />
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-2 shadow-sm">
            <div className="text-lg font-light text-gray-900">
              {total.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total tickets</div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex-1 min-w-[200px] flex flex-col justify-center space-y-3">
          {labels.map((label, index) => {
            const value = data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const backgroundColor = chartData.datasets[0].backgroundColor[index];

            return (
              <div key={label} className="flex items-center justify-center space-x-3 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor }}
                ></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {value.toLocaleString()} ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Total: {total.toLocaleString()} tickets</span>
          <span>
            {labels.length} {labels.length === 1 ? "región" : "regiones"}
          </span>
        </div>
      </div>
    </div>
  );
};