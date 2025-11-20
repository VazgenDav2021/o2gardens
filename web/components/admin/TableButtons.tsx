import { Button } from "@/ui/button";
import { Grid3x3 } from "lucide-react";

interface TableButtonsProps {
  addTable: (capacity: number) => void;
}

export const TableButtons = ({ addTable }: TableButtonsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[2, 4, 6, 8].map((n) => (
      <Button
        key={n}
        type="button"
        variant="outline"
        onClick={() => addTable(n)}
        className="h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary">
        <Grid3x3 className="w-6 h-6" />
        <span>{n} места</span>
      </Button>
    ))}
  </div>
);
