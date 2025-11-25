"use client";

import { HallEditor } from "@/components/admin/HallEditor";
import { Table, Scene } from "@/types";
import { useSelectedTableStore } from "@/hooks/useSelectedTableStore";

interface HallMapViewerProps {
  tables: Table[];
  scenes: Scene[];
}

export default function HallMapViewer({ tables, scenes }: HallMapViewerProps) {
  const { selectedTable, setSelectedTable } = useSelectedTableStore();

  const handleTableReserve = (tableId: string) => {
    const table = tables.find((t) => t._id === tableId);
    if (table) {
      // Toggle selection: if already selected, deselect; otherwise select
      if (selectedTable === tableId) {
        setSelectedTable(null, null);
      } else {
        setSelectedTable(tableId, table.seats);
      }
    } else {
      setSelectedTable(tableId);
    }
  };

  return (
    <HallEditor
      mode="client"
      tables={tables}
      scenes={scenes}
      selectedTableId={selectedTable}
      onReserve={handleTableReserve}
    />
  );
}

