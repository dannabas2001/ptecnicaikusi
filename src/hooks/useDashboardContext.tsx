import { useContext } from "react";
import { DashboardContext, type DashboardContextType } from "../contexts/DashboardContext";

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
