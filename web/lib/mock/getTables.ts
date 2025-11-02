import { TableType } from "@/types";

type Mode = "normal" | "empty" | "error";

export const getMockTables = async (
  mode: Mode = "normal"
): Promise<TableType[]> => {
  if (mode === "error") {
    throw new Error("Ошибка при загрузке столов");
  }

  if (mode === "empty") {
    return [];
  }

  return [
    {
      id: "table-1",
      name: "table-1",
      x: 50,
      y: 50,
      capacity: 2,
      status: "available",
    },
    {
      id: "table-2",
      name: "table-2",
      x: 150,
      y: 50,
      capacity: 4,
      status: "available",
    },
    {
      id: "table-3",
      name: "table-3",
      x: 300,
      y: 50,
      capacity: 6,
      status: "reserved",
    },
    {
      id: "table-4",
      name: "table-4",
      x: 50,
      y: 200,
      capacity: 4,
      status: "available",
    },
    {
      id: "table-5",
      name: "table-5",
      x: 200,
      y: 200,
      capacity: 6,
      status: "available",
    },
    {
      id: "table-6",
      name: "table-6",
      x: 350,
      y: 200,
      capacity: 8,
      status: "available",
    },
  ];
};

export const getMockTableById = async (
  tableId: string,
  mode: Mode = "normal"
): Promise<TableType | null> => {
  const tables = await getMockTables(mode);
  return tables.find((t) => t.id === tableId) || null;
};
