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
import type { Country, City, Office } from "../../types/dashboardTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RevenueChart = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext || !dashboardContext.countries || dashboardContext.countries.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">No hay datos de revenue disponibles</p>
      </div>
    );
  }

  const { countries, selectedCountryId, selectedCityId, selectedOfficeId } = dashboardContext;

  let labels: string[] = [];
  let data: number[] = [];
  let chartTitle = "Revenue";

  if (selectedCountryId) {
    const selectedCountry = countries.find((country: Country) => country.id === selectedCountryId);
    if (selectedCountry) {
      if (selectedCityId) {
        const selectedCity = selectedCountry.cities.find((country: City) => country.id === selectedCityId);
        if (selectedCity) {
          if (selectedOfficeId) {
            const selectedOffice = selectedCity.offices.find((office: Office) => office.id === selectedOfficeId);
            if (selectedOffice) {
              return (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Revenue Total</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">{selectedOffice.name}</span> • {selectedCity.name}
                  </p>
                  <div className="text-3xl font-light text-gray-900 mb-2">
                    ${selectedOffice.revenue.toLocaleString()}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">vs. promedio del sector</p>
                </div>
              );
            }
          } else {
            labels = selectedCity.offices.map((office: Office) => office.name);
            data = selectedCity.offices.map((office: Office) => office.revenue);
            chartTitle = `Revenue • ${selectedCity.name}`;
          }
        }
      } else {
        labels = selectedCountry.cities.map((ciudad: City) => ciudad.name);
        data = selectedCountry.cities.map((ciudad : City) =>
          ciudad.offices.reduce((acc, o) => acc + o.revenue, 0)
        );
        chartTitle = `Revenue • ${selectedCountry.name}`;
      }
    }
  } else {
    labels = countries.map((country: Country) => country.name);
    data = countries.map((country: Country) =>
      country.cities.reduce((accC, city) => accC + city.offices.reduce((accO, office) => accO + office.revenue, 0), 0)
    );
    chartTitle = "Revenue Global";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false
      },
      title: { 
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          title: function(context: TooltipItem<'bar'>[]) {
            return context[0].label;
          },
          label: function(context: TooltipItem<'bar'>) {
            return `$${context.formattedValue.toLocaleString()}`;
          }
        }
      }
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
          color: '#6B7280',
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
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          callback: (value: string | number) => {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (numValue >= 1000000) {
              return `$${(numValue / 1000000).toFixed(1)}M`;
            } else if (numValue >= 1000) {
              return `$${(numValue / 1000).toFixed(0)}K`;
            }
            return `$${numValue}`;
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-800">{chartTitle}</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">Ingresos totales por región</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="flex-shrink-0 mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Total: ${data.reduce((sum, val) => sum + val, 0).toLocaleString()}</span>
          <span>{labels.length} {labels.length === 1 ? 'región' : 'regiones'}</span>
        </div>
      </div>
    </div>
  );
};