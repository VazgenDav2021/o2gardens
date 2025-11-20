import { useEffect, useState } from "react";
import { Canvas } from "fabric";

interface FabricCanvasWrapperProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const FabricCanvasWrapper = ({ canvasRef }: FabricCanvasWrapperProps) => {
  const [canvasInstance, setCanvasInstance] = useState<Canvas | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initCanvas = () => {
      const canvas = new Canvas(canvasRef.current!, {
        selection: false,
      });
      setCanvasInstance(canvas);
      return canvas;
    };

    const canvas = initCanvas();

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  useEffect(() => {
    if (canvasInstance) {
      canvasInstance.setZoom(zoom);
      canvasInstance.requestRenderAll();
    }
  }, [zoom, canvasInstance]);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={zoomOut}>
          -
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={zoomIn}>
          +
        </button>
        <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
      </div>
      <div
        className="border rounded-lg overflow-hidden shadow-sm"
        style={{ width: "100%", height: 500 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
