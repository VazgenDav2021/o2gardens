import { Scene, Table } from "@/types";
import { useState, useEffect } from "react";

interface UseHallLayoutProps {
  initialTables?: Table[];
  initialScenes?: Scene[];
  setValue?: (
    name: "schema.tables" | "schema.scenes",
    value: Table[] | Scene[]
  ) => void;
}

export const useHallLayout = ({
  initialTables = [],
  initialScenes = [],
  setValue,
}: UseHallLayoutProps = {}) => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);

  useEffect(() => {
    setValue?.("schema.tables", tables);
  }, [tables, setValue]);

  useEffect(() => {
    setValue?.("schema.scenes", scenes);
  }, [scenes, setValue]);

  const addTable = (seats: number) => {
    const newId = "t" + (tables.length + 1);
    setTables((prev) => [
      ...prev,
      { _id: newId, x: 100 + prev.length * 40, y: 400, seats, reserved: false },
    ]);
  };

  const addScene = () => {
    const newId = "s" + (scenes.length + 1);
    setScenes((prev) => [
      ...prev,
      {
        _id: newId,
        x: 300,
        y: 100 + prev.length * 100,
        width: 150,
        height: 80,
      },
    ]);
  };

  const moveItem = (
    id: string,
    type: "table" | "scene",
    x: number,
    y: number
  ) => {
    if (type === "table") {
      setTables((prev) => prev.map((t) => (t._id === id ? { ...t, x, y } : t)));
    } else {
      setScenes((prev) => prev.map((s) => (s._id === id ? { ...s, x, y } : s)));
    }
  };

  const deleteItem = (id: string, type: "table" | "scene") => {
    if (type === "table") {
      setTables((prev) => prev.filter((t) => t._id !== id));
    } else {
      setScenes((prev) => prev.filter((s) => s._id !== id));
    }
  };

  return { tables, scenes, addTable, addScene, moveItem, deleteItem };
};
