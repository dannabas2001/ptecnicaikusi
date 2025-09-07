import React, { useEffect } from "react";
import { fetchData } from "../services/fetchApi";
import { useDashboardContext } from "../hooks/useDashboardContext";
import { DashboardFilters } from "../components/DashboardFilters";
import { DashboardChart } from "../components/DashboardChart";
import { EmployeesDoughnut } from "../components/EmployeeChart";
import { RevenueChart } from "../components/Revenue";
import { TicketsPolarArea } from "../components/TicketChart";

const Dashboard = () => {
  const { setCountries } = useDashboardContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [setCountries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 text-center tracking-tight">
          Dashboard 
          <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-gray-500 mt-1">
            Comportamiento Actual de la Compañía
          </span>
        </h1>
      </div>

      {/* Filtros */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex justify-center">
          <DashboardFilters />
        </div>
      </div>

      {/* Charts Container - Ocupa el resto del espacio */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Chart 1 - Oficinas por país/ciudad */}
          <div className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center min-h-0">
              <DashboardChart />
            </div>
          </div>

          {/* Chart 2 - Empleados */}
          <div className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center min-h-0">
              <EmployeesDoughnut />
            </div>
          </div>

          {/* Chart 3 - Revenue */}
          <div className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center min-h-0">
              <RevenueChart />
            </div>
          </div>

          {/* Chart 4 - Tickets */}
          <div className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center min-h-0">
              <TicketsPolarArea />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;