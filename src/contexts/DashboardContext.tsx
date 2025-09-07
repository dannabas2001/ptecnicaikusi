import { createContext } from "react";
import type { DashboardContextType,  } from "../types/dashboardTypes";



export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);


