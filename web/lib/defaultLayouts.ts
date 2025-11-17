const halls = ["Зал 1", "Зал 2", "Терраса"] as const;
export type Hall = (typeof halls)[number];
export type LayoutItem = {
  type: "tree";
  x: number;
  y: number;
};

export const defaultLayouts: Record<Hall, LayoutItem[]> = {
  "Зал 1": [
    { type: "tree", x: 40, y: 40 },
    { type: "tree", x: 40, y: 140 },
    { type: "tree", x: 40, y: 240 },
  ],
  "Зал 2": [
    { type: "tree", x: 30, y: 60 },
    { type: "tree", x: 30, y: 160 },
  ],
  Терраса: [
    { type: "tree", x: 60, y: 70 },
    { type: "tree", x: 60, y: 170 },
    { type: "tree", x: 60, y: 270 },
  ],
};
