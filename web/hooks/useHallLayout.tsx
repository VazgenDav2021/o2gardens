import { useState, useEffect } from "react";

interface UseHallLayoutProps {
  initialTables?: any[];
  initialScenes?: any[];
  setValue?: (name: "tables" | "scenes", value: any) => void;
}

export const useHallLayout = ({
  initialTables = [],
  initialScenes = [],
  setValue,
}: UseHallLayoutProps = {}) => {
  const [tables, setTables] = useState<any[]>(initialTables);
  const [scenes, setScenes] = useState<any[]>(initialScenes);

  useEffect(() => {
    setValue?.("tables", tables);
  }, [tables, setValue]);

  useEffect(() => {
    setValue?.("scenes", scenes);
  }, [scenes, setValue]);

  const addTable = (seats: number) => {
    const newId = "t" + (tables.length + 1);
    setTables((prev) => [
      ...prev,
      { id: newId, x: 100 + prev.length * 40, y: 400, seats },
    ]);
  };

  const addScene = () => {
    const newId = "s" + (scenes.length + 1);
    setScenes((prev) => [
      ...prev,
      { id: newId, x: 300, y: 100 + prev.length * 100, width: 150, height: 80 },
    ]);
  };

  const moveItem = (
    id: string,
    type: "table" | "scene",
    x: number,
    y: number
  ) => {
    if (type === "table") {
      setTables((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
    } else {
      setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, x, y } : s)));
    }
  };

  const deleteItem = (id: string, type: "table" | "scene") => {
    if (type === "table") {
      setTables((prev) => prev.filter((t) => t.id !== id));
    } else {
      setScenes((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return { tables, scenes, addTable, addScene, moveItem, deleteItem };
};
