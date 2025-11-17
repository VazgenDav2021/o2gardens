import { useState, useEffect } from "react";
import { Canvas, Rect, Circle, Group, Text, Shadow } from "fabric";
import { TableType } from "@/types";

export const useTables = (
  fabricCanvasRef: React.MutableRefObject<Canvas | null>
) => {
  const [tables, setTables] = useState<TableType[]>([]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.clear();
    canvas.backgroundColor = "#fafafa";

    tables.forEach((table) => {
      addTableToCanvas(table);
    });

    canvas.renderAll();
  }, [tables, fabricCanvasRef]);

  const addTableToCanvas = (table: TableType) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const colors: Record<number, string> = {
      2: "#e0f2fe",
      4: "#dbeafe",
      6: "#e0e7ff",
      8: "#f3e8ff",
    };

    const shadow = new Shadow({
      color: "rgba(0,0,0,0.15)",
      blur: 8,
      offsetX: 0,
      offsetY: 2,
    });

    let shape: Rect | Circle;
    let textOffsetX = 0;
    let textOffsetY = 0;

    switch (table.capacity) {
      case 2:
        shape = new Rect({
          fill: colors[2],
          width: 60,
          height: 60,
          rx: 4,
          ry: 4,
          stroke: "#6366f1",
          strokeWidth: 2,
          shadow,
        });
        textOffsetX = 30;
        textOffsetY = 30;
        break;
      case 4:
        shape = new Rect({
          fill: colors[4],
          width: 80,
          height: 80,
          rx: 8,
          ry: 8,
          stroke: "#6366f1",
          strokeWidth: 2,
          shadow,
        });
        textOffsetX = 40;
        textOffsetY = 40;
        break;
      case 6:
        shape = new Rect({
          fill: colors[6],
          width: 120,
          height: 60,
          rx: 8,
          ry: 8,
          stroke: "#6366f1",
          strokeWidth: 2,
          shadow,
        });
        textOffsetX = 60;
        textOffsetY = 30;
        break;
      case 8:
        shape = new Circle({
          fill: colors[8],
          radius: 60,
          stroke: "#6366f1",
          strokeWidth: 2,
          shadow,
        });
        textOffsetX = 60;
        textOffsetY = 60;
        break;
      default:
        shape = new Rect({
          fill: "#e5e7eb",
          width: 60,
          height: 60,
          rx: 8,
          ry: 8,
          stroke: "#6366f1",
          strokeWidth: 2,
          shadow,
        });
        textOffsetX = 30;
        textOffsetY = 30;
    }

    const text = new Text(`Стол ${table.name}\n${table.capacity} мест`, {
      left: textOffsetX,
      top: textOffsetY,
      fontSize: 12,
      fontFamily: "Arial",
      fill: "#1f2937",
      textAlign: "center",
      originX: "center",
      originY: "center",
    });

    const group = new Group([shape, text], {
      left: table.x,
      top: table.y,
      hasControls: false,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      hoverCursor: "move",
    });

    group.on("modified", () => {
      setTables((prev) =>
        prev.map((t) =>
          t._id === table._id
            ? { ...t, x: group.left || 0, y: group.top || 0 }
            : t
        )
      );
    });

    canvas.add(group);
  };

  const addTable = (capacity: number) => {
    const newTable: TableType = {
      _id: Date.now().toString(),
      name: tables.length + 1 + "",
      capacity,
      x: 50 + (tables.length % 8) * 100,
      y: 50 + Math.floor(tables.length / 8) * 100,
      status: "available",
    };
    setTables((prev) => [...prev, newTable]);
  };

  const removeTable = (id: string) =>
    setTables((prev) => prev.filter((t) => t._id !== id));

  return { tables, addTable, removeTable, setTables };
};
