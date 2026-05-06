import { useEffect, useRef } from "react";

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

export default function DitherField({
  className = "",
  color = "#ff6819",
  density = 10,
  intensity = 0.55,
  speed = 0.55,
  fade = "radial"
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    const rgb = hexToRgb(color);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const cell = density;
      const time = frame * 0.018 * speed;
      const centerX = width * 0.56;
      const centerY = height * 0.5;
      const maxDistance = Math.hypot(Math.max(centerX, width - centerX), Math.max(centerY, height - centerY));

      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const threshold = (BAYER_4[(y / cell) & 3][(x / cell) & 3] + 0.5) / 16;
          const wave = (
            Math.sin(x * 0.017 + time) +
            Math.cos(y * 0.019 - time * 1.4) +
            Math.sin((x + y) * 0.011 + time * 0.8)
          ) / 3;
          const distance = Math.hypot(x - centerX, y - centerY) / maxDistance;
          const mask = fade === "linear" ? 1 - x / width : Math.max(0, 1 - distance * 1.18);
          const value = (wave * 0.5 + 0.5) * mask * intensity;

          if (value > threshold * 0.7) {
            const alpha = Math.min(0.42, Math.max(0.04, value * 0.34));
            const size = Math.max(1, Math.floor(cell * (0.28 + value * 0.24)));
            context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            context.fillRect(x, y, size, size);
          }
        }
      }

      frame += 1;
      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [color, density, fade, intensity, speed]);

  return <canvas ref={canvasRef} className={`dither-field ${className}`} aria-hidden="true" />;
}
