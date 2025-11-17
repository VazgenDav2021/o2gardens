interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const FabricCanvasWrapper = ({ canvasRef }: Props) => (
  <div
    className="border rounded-lg overflow-hidden shadow-sm"
    style={{ width: "100%", height: 500, }}>
    <canvas ref={canvasRef} />
  </div>
);
