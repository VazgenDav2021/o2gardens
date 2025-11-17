import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas } from "fabric";

export const useFabricCanvas = (enabled: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !enabled) return;

    const parentWidth = canvasRef.current.parentElement?.clientWidth || 800;

    const canvas = new FabricCanvas(canvasRef.current, {
      backgroundColor: "#fafafa",
    });

    canvas.setWidth(parentWidth);
    canvas.setHeight(500);

    fabricCanvasRef.current = canvas;

    const handleResize = () => {
      const newWidth = canvasRef.current?.parentElement?.clientWidth || 800;
      canvas.setDimensions({ width: newWidth, height: 500 });
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [enabled]);

  return { canvasRef, fabricCanvasRef };
};
