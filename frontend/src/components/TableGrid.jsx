import { useEffect, useState, useMemo, useCallback } from "react";
import { getTables } from "../api/tables";
import ReservationModal from "./ReservationModal";

export default function TableGrid() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    getTables().then(setTables);
  }, []);

  const zones = ["left", "center", "right"];
  const groupedTables = useMemo(
    () =>
      zones.map((zone) => ({
        zone,
        items: tables.filter((t) => t.zone === zone),
      })),
    [tables]
  );

  const handleSelectTable = useCallback((table) => {
    setSelectedTable(table);
  }, []);

  return (
    <div className="relative w-[1200px] h-[1500px] mx-auto bg-gray-50 rounded-xl border border-gray-300 shadow-inner overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-red-700 text-white flex items-center justify-center font-bold text-xl rounded-xl shadow-md p-3">
        🎤 ԲԵՄ
      </div>

      <div className="absolute top-[150px] flex justify-between w-full h-[1000px]">
        {groupedTables.map(({ zone, items }) => (
          <div key={zone} className="relative flex-1 h-full">
            {items.map((table) => {
              // базовый класс по форме и размеру
              let shapeClass =
                table.guests === 8
                  ? "bg-orange-200 rounded-full w-[110px] h-[110px] border-2 border-blue-600 p-3"
                  : table.guests === 6
                  ? "bg-green-200 rounded-lg w-[130px] h-[80px] border-2 border-blue-600 p-3"
                  : "bg-blue-200 rounded-md w-[70px] h-[70px] border-2 border-blue-600 p-2";

              // если забронирован, меняем только фон и бордер
              if (table.isBooked) {
                shapeClass = shapeClass
                  .replace(/bg-[\w-]+/, "bg-red-400")
                  .replace(/border-[\w-]+/, "border-red-800");
              }

              return (
                <div
                  key={table.id}
                  className={`absolute flex flex-col items-center justify-center cursor-pointer text-gray-800 font-semibold transition-transform duration-200 shadow-md ${shapeClass}`}
                  style={{
                    left: `${table.x}px`,
                    top: `${table.y}px`,
                    transform: `translate(-50%, -50%) rotate(${
                      table.rotate || 0
                    }deg)`,
                  }}
                  onClick={() => handleSelectTable(table)}>
                  {table.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedTable && (
        <ReservationModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onUpdate={() => getTables().then(setTables)}
        />
      )}
    </div>
  );
}
