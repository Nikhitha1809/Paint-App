import { useEffect, useRef, useState } from "react";
import "./App.css";
import Tools from "./Tools";

function App() {
  const [brushColor, setBrushColor] = useState<string>("black");
  const [brushOpacity, setBrushOpacity] = useState<number>(0.5);
  const [brushWidth, setBrushWidth] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isdrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const context = canvas.getContext("2d");

      if (context) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = brushColor;
        context.lineWidth = brushWidth;
        context.globalAlpha = brushOpacity;
        contextRef.current = context;
      }
    }
  }, [brushColor, brushOpacity, brushWidth]);
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };
  const endDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };
  const drawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isdrawing) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  return (
    <>
      <h1 style={{color:"#7E60BF"}}>Drawing App</h1>
      <p>
        <b>Current Values:</b> Color: {brushColor}, Opacity: {brushOpacity}, Width:{" "}
        {brushWidth}
      </p>
      <div className="menu">
        <Tools
          setBrushColor={setBrushColor}
          setBrushWidth={setBrushWidth}
          setBrushOpacity={setBrushOpacity}
          brushWidth={brushWidth}
          brushOpacity={brushOpacity}
        />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={drawing}
          ref={canvasRef}
        />
      </div>
    </>
  );
}

export default App;
