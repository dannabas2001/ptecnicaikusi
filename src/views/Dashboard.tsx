import { useEffect } from "react";
import { fetchData } from "../services/fetchApi";
import { useDashboardContext } from "../hooks/useDashboardContext";
import { DashboardFilters } from "../components/ui/DashboardFilters";
import { DashboardChart } from "../components/charts/DashboardChart";
import { RevenueChart } from "../components/charts/RevenueChart";
import { TicketsPolarArea } from "../components/charts/TicketChart";
import { EmployeesDoughnut } from "../components/charts/EmployeeChart";
import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const { setCountries, loading, setLoading } = useDashboardContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [setCountries, setLoading]);

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

      {loading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-4 sm:px-6 lg:px-8 pb-6 gap-4">
          {/* Sidebar de filtros */}
          <aside className="flex-shrink-0 w-full lg:w-64 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4">
            <DashboardFilters />
          </aside>

          {/* Área de charts */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
            {[DashboardChart, EmployeesDoughnut, RevenueChart, TicketsPolarArea].map(
              (ChartComponent, idx) => (
                <div
                  key={idx}
                  className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 flex flex-col overflow-hidden"
                >
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <ChartComponent />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard