import { createContext } from "react";
import type { AuthContextProps } from "../types/loginTypes";



export const AuthContext = createContext<AuthContextProps| undefined>(undefined);
