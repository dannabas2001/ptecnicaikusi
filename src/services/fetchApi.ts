import type { Country } from "../types/dashboardTypes";

export const fetchData = async (): Promise<Country[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("/data/data.json");
  if (!res.ok) throw new Error("Error al cargar la información");
  const data: Country[] = await res.json();
  return data;
};