"use client";

import { useSelectedTableStore } from "@/hooks/useSelectedTableStore";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

const tables = [
  { id: "table-1", x: 50, y: 50, capacity: 2, status: "available" },
  { id: "table-2", x: 150, y: 50, capacity: 4, status: "available" },
  { id: "table-3", x: 300, y: 50, capacity: 6, status: "reserved" },
  { id: "table-4", x: 50, y: 200, capacity: 4, status: "available" },
  { id: "table-5", x: 200, y: 200, capacity: 6, status: "available" },
  { id: "table-6", x: 350, y: 200, capacity: 8, status: "available" },
];

export default function HallSVGClient() {
  const { selectedTable, setSelectedTable } = useSelectedTableStore();
  const t = useTranslations("common.hallMap");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handleTableClick = (tableId: string, status: string) => {
    if (status === "available") setSelectedTable(tableId);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.min(Math.max(0.5, s + delta), 2));
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging || !dragStart.current) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    dragStart.current = null;
  };

  const renderTableShape = (table: (typeof tables)[0], isSelected: boolean) => {
    let fill = "";
    let stroke = "#333";

    if (table.status === "reserved") {
      fill = "#9ca3af";
      stroke = "#9ca3af";
    } else if (isSelected) {
      fill = "#206040";
      stroke = "#206040";
    } else {
      fill = "white";
      stroke = "#333";
    }

    const commonProps = {
      fill,
      stroke,
      strokeWidth: 3,
      cursor: table.status === "reserved" ? "not-allowed" : "pointer",
    };

    switch (table.capacity) {
      case 2:
        return (
          <rect
            x={table.x}
            y={table.y}
            width={60}
            height={60}
            rx={4}
            ry={4}
            {...commonProps}
          />
        );
      case 4:
        return (
          <rect
            x={table.x}
            y={table.y}
            width={80}
            height={80}
            rx={8}
            ry={8}
            {...commonProps}
          />
        );
      case 6:
        return (
          <rect
            x={table.x}
            y={table.y}
            width={120}
            height={60}
            rx={8}
            ry={8}
            {...commonProps}
          />
        );
      case 8:
        return (
          <circle cx={table.x + 60} cy={table.y + 60} r={60} {...commonProps} />
        );
      default:
        return (
          <rect
            x={table.x}
            y={table.y}
            width={60}
            height={60}
            rx={8}
            ry={8}
            {...commonProps}
          />
        );
    }
  };

  return (
    <div
      className="relative bg-muted/20 rounded-lg border-2 border-dashed border-border"
      style={{ height: "500px", overflow: "hidden" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 500"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        {tables.map((table) => {
          const isSelected = selectedTable === table.id;
          return (
            <g
              key={table.id}
              onClick={() => handleTableClick(table.id, table.status)}>
              {renderTableShape(table, isSelected)}
              <text
                x={
                  table.x +
                  (table.capacity === 2
                    ? 30
                    : table.capacity === 4
                    ? 40
                    : table.capacity === 6
                    ? 60
                    : 60)
                }
                y={
                  table.y +
                  (table.capacity === 2
                    ? 30
                    : table.capacity === 4
                    ? 40
                    : table.capacity === 6
                    ? 30
                    : 60)
                }
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-sm font-medium ${
                  table.status === "reserved"
                    ? "fill-white"
                    : isSelected
                    ? "fill-white"
                    : "fill-foreground"
                }`}>
                {table.capacity} {t("SEAT")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
