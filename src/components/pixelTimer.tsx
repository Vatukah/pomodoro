import { useEffect, useRef } from "react";
import { drawTime } from "../uitls/helper";


interface PixelTimerProps {
  pixelSize?: number;
  color?: string;
  glow?: boolean;
  minutes: number;
  seconds: number;
  width?: number;
}

const PixelTimer: React.FC<PixelTimerProps> = ({
  pixelSize = 10,
  color = "#ff6347",
  glow = true,
  minutes,
  seconds,
  width = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI / retina scaling
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = 200 * scale;
    ctx.scale(scale, scale);

    ctx.shadowColor = glow ? color : "transparent";
    ctx.shadowBlur = glow ? 8 : 0;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, 200);
      drawTime(ctx, width, 200, minutes, seconds, color, pixelSize);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
     
    };
  }, [pixelSize, color, glow, minutes, seconds, width]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "0 auto",
        
      }}
    />
  );
};

export default PixelTimer;
