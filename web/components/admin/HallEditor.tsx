"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TableItem {
  id: string;
  x: number;
  y: number;
  seats: number;
  reserved?: boolean;
}

export interface SceneItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HallProps {
  mode: "client" | "admin";
  tables: TableItem[];
  scenes: SceneItem[];
  onAddTable?: (seats: number) => void;
  onAddScene?: () => void;
  onMoveItem?: (
    id: string,
    type: "table" | "scene",
    x: number,
    y: number
  ) => void;
  onReserve?: (tableId: string) => void;
  onDelete?: (id: string, type: "table" | "scene") => void;
}

type DragState = {
  id: string;
  type: "table" | "scene";
  offsetX: number;
  offsetY: number;
} | null;

export function HallEditor({
  mode,
  tables,
  scenes,
  onAddTable,
  onAddScene,
  onMoveItem,
  onReserve,
  onDelete,
}: HallProps) {
  const [dragging, setDragging] = useState<DragState>(null);

  const svgWidth = 900;
  const svgHeight = 650;

  const [scale, setScale] = useState(1);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const getSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(v, max));

  const startDrag = (
    e: React.MouseEvent,
    id: string,
    type: "table" | "scene",
    x: number,
    y: number
  ) => {
    if (mode !== "admin") return;

    const p = getSvgPoint(e.clientX, e.clientY);

    setDragging({
      id,
      type,
      offsetX: p.x - x,
      offsetY: p.y - y,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const p = getSvgPoint(e.clientX, e.clientY);

    let newX = p.x - dragging.offsetX;
    let newY = p.y - dragging.offsetY;

    // границы
    newX = clamp(newX, 20, svgWidth - 20);
    newY = clamp(newY, 20, svgHeight - 20);

    onMoveItem?.(dragging.id, dragging.type, newX, newY);
  };

  const endDrag = () => setDragging(null);

  const renderTableShape = (t: TableItem) => {
    const common = {
      stroke: "#222",
      strokeWidth: 2,
      fill: t.reserved ? "#ff6b6b" : "#4ade80",
      style: { cursor: mode === "admin" ? "grab" : "pointer" },
      onMouseDown: (e: any) => startDrag(e, t.id, "table", t.x, t.y),
      onClick: () => mode === "client" && onReserve?.(t.id),
    };

    switch (t.seats) {
      case 2:
        return (
          <rect
            x={t.x - 20}
            y={t.y - 20}
            width={40}
            height={40}
            rx={6}
            {...common}
          />
        );
      case 4:
        return <circle cx={t.x} cy={t.y} r={25} {...common} />;
      case 6:
        return (
          <rect
            x={t.x - 30}
            y={t.y - 20}
            width={60}
            height={40}
            rx={8}
            {...common}
          />
        );
      case 8:
        return <circle cx={t.x} cy={t.y} r={35} {...common} />;
      default:
        return <circle cx={t.x} cy={t.y} r={30} {...common} />;
    }
  };

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* ADMIN PANEL */}
      {mode === "admin" && (
        <div className="p-4 rounded-xl shadow-md bg-white border flex flex-col gap-3 w-220">
          <h3 className="font-semibold text-lg">Управление</h3>

          {[2, 4, 6, 8].map((s) => (
            <button
              key={s}
              className="bg-primary text-white px-3 py-2 rounded"
              type="button"
              onClick={() => onAddTable?.(s)}>
              Добавить стол ({s})
            </button>
          ))}

          <button
            className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
            type="button"
            onClick={onAddScene}>
            Добавить сцену
          </button>
        </div>
      )}

      {/* SVG HALL */}
      <svg
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
        style={{
          border: "2px solid #ddd",
          background: "#f0f4f7",
          borderRadius: 12,
          cursor: dragging ? "grabbing" : "default",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}>
        <g transform={`scale(${scale})`}>
          {scenes.map((s) => (
            <g key={s.id}>
              <rect
                x={s.x}
                y={s.y}
                width={s.width}
                height={s.height}
                fill="#1e40af"
                rx={8}
                style={{ cursor: mode === "admin" ? "grab" : "default" }}
                onMouseDown={(e) => startDrag(e, s.id, "scene", s.x, s.y)}
              />
              {mode === "admin" && (
                <text
                  x={s.x + s.width - 10}
                  y={s.y - 5}
                  fontSize={16}
                  fill="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete?.(s.id, "scene")}>
                  ✕
                </text>
              )}
            </g>
          ))}

          {tables.map((t) => (
            <g key={t.id}>
              {renderTableShape(t)}
              <text
                x={t.x}
                y={t.y + 5}
                fontSize={14}
                textAnchor="middle"
                fill="#111"
                pointerEvents="none">
                {t.seats}
              </text>

              {mode === "admin" && (
                <text
                  x={t.x + 25}
                  y={t.y - 25}
                  fontSize={18}
                  fill="red"
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => onDelete?.(t.id, "table")}>
                  ✕
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}