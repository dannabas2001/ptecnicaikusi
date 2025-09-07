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
    <div className=" bg-gray-100 p-6 flex flex-col">
      {/* Título principal */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Comportamiento Actual de la Compañía
      </h1>

      {/* Filtros */}
      <div className="mb-6 flex justify-center">
        <DashboardFilters />
      </div>

      {/* Grid de charts */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Oficinas por país/ciudad */}
        <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden h-full">
          <DashboardChart />
        </div>

        {/* Empleados */}
        <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden h-full">
          <EmployeesDoughnut />
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden h-full">
          <RevenueChart />
        </div>

        {/* Tickets abiertos */}
        <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden h-full">
          <TicketsPolarArea />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
