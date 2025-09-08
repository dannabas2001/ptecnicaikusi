import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import type { City, Country, Office } from "../../types/dashboardTypes";

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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">
          No hay datos de oficinas disponibles
        </p>
      </div>
    );
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } =
    dashboardContext;

  // Si hay oficina seleccionada → mostramos solo tarjeta con texto
  if (selectedCountryId && selectedCityId && selectedOfficeId) {
    const country = countries.find((country: Country) => country.id === selectedCountryId);
    const city = country?.cities.find((city: City) => city.id === selectedCityId);
    const office = city?.offices.find((office: Office) => office.id === selectedOfficeId);

    if (office && city) {
      const totalOfficesInCity = city.offices.length;
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Oficina Activa
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">{office.name}</span> • {city.name}
          </p>
          <div className="text-sm text-gray-600 mb-2">
            Una de <span className="font-semibold text-gray-900">{totalOfficesInCity}</span> oficinas
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((1 / totalOfficesInCity) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">en {city.name}</p>
        </div>
      );
    }
  }
  if (selectedCountryId && selectedCityId) {
    const selectedCountry = countries.find(
      (country: Country) => country.id === selectedCountryId
    );
    const selectedCity = selectedCountry?.cities.find(
      (city: City) => city.id === selectedCityId
    );

    if (selectedCity) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Oficinas en {selectedCity.name}
          </h3>
          <div className="text-3xl font-light text-gray-900 mb-4">
            {selectedCity.offices.length}
          </div>
          <div className="max-w-sm">
            <div className="space-y-2">
              {selectedCity.offices.map((office) => (
                <div
                  key={office.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {office.name}
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "Oficinas";

  if (selectedCountryId) {
    const selectedCountry = countries.find(
      (country: Country) => country.id === selectedCountryId
    );
    if (selectedCountry) {
      chartTitle = `Oficinas • ${selectedCountry.name}`;
      labels = selectedCountry.cities.map((city) => city.name);
      data = selectedCountry.cities.map((city) => city.offices.length);
    }
  } else {
    chartTitle = "Oficinas Global";
    labels = countries.map((c) => c.name);
    data = countries.map((country:Country) =>
      country.cities.reduce((acc, city) => acc + city.offices.length, 0)
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de Oficinas",
        data,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(34, 197, 94, 0.9)",
        hoverBorderWidth: 2,
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
        borderColor: "rgba(34, 197, 94, 0.3)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 8,
        callbacks: {
          title: function (context: TooltipItem<"bar">[]) {
            return context[0].label;
          },
          label: function (context: TooltipItem<"bar">) {
            const value = context.parsed.y;
            return `${value} ${value === 1 ? 'oficina' : 'oficinas'}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            weight: 500,
          },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
          stepSize: 1,
          callback: (value: string | number) => {
            const numValue =
              typeof value === "string" ? parseFloat(value) : value;
            return Math.floor(numValue).toString();
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    },
  };

  const total = data.reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="flex-shrink-0 mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-800">{chartTitle}</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Cantidad de oficinas por región
        </p>
      </div>
      <div className="flex-1 min-h-0 relative">
        <Bar data={chartData} options={options} />
      </div>
      <div className="flex-shrink-0 mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Total: {total.toLocaleString()} oficinas</span>
          <span>
            {labels.length} {labels.length === 1 ? "región" : "regiones"}
          </span>
        </div>
      </div>
    </div>
  );
};