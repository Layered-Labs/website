import type { TableData } from "@/lib/content/table";

export const lowest: TableData = {
  first: "ZIP code",
  columns: [{ label: "Neighborhood", align: "left" }, "Fixed broadband", "No internet"],
  rows: [
    { label: "11412", cells: ["Saint Albans, Queens", "33.6%", "10.4%"], highlight: true },
    { label: "11413", cells: ["Springfield Gardens, Queens", "35.1%", "9.5%"] },
    { label: "11436", cells: ["Jamaica, Queens", "49.7%", "12.3%"] },
    { label: "10454", cells: ["South Bronx", "55.1%", "23.6%"] },
    { label: "10029", cells: ["East Harlem, Manhattan", "55.5%", "19.8%"] },
  ],
  caption: "The five ZIP codes with the lowest share of households with fixed broadband (Census ACS 2022).",
};
