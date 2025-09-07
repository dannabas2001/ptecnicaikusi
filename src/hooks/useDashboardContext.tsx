import { useContext } from "react";
import { DashboardContext} from "../contexts/DashboardContext";
import type { DashboardContextType } from "../types/dashboardTypes";

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
