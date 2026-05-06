import { useEffect, useMemo, useState } from "react";

const GLYPHS = ["·", ":", "+", "*", "#", "%", "@"];

function buildAsciiFrame(frame, columns, rows) {
  const lines = [];
  const headline = "FREEZE  DIFF  GATE";
  const proof = "PASSED 6/6";
  const trace = "TRACE CAPTURED";

  for (let y = 0; y < rows; y += 1) {
    let line = "";
    for (let x = 0; x < columns; x += 1) {
      const cx = x - columns / 2;
      const cy = y - rows / 2;
      const ring = Math.abs(Math.hypot(cx / 1.9, cy * 1.7) - 12);
      const wave = Math.sin(x * 0.31 + frame * 0.12) + Math.cos(y * 0.63 - frame * 0.08);
      const index = Math.max(0, Math.min(GLYPHS.length - 1, Math.floor((2.1 - ring + wave * 0.36) * 1.2)));
      line += ring < 2.3 ? GLYPHS[index] : " ";
    }
    lines.push(line);
  }

  const write = (text, row, col) => {
    if (row < 0 || row >= lines.length) return;
    const current = lines[row].split("");
    text.split("").forEach((char, index) => {
      const position = col + index;
      if (position >= 0 && position < current.length) current[position] = char;
    });
    lines[row] = current.join("");
  };

  write(trace, 2, Math.floor((columns - trace.length) / 2));
  write(headline, Math.floor(rows / 2) - 1, Math.floor((columns - headline.length) / 2));
  write(proof, Math.floor(rows / 2) + 2, Math.floor((columns - proof.length) / 2));

  return lines.join("\n");
}

export default function AsciiTrace({ className = "" }) {
  const [frame, setFrame] = useState(0);
  const columns = 45;
  const rows = 16;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const interval = window.setInterval(() => {
      setFrame((value) => (value + 1) % 240);
    }, 110);

    return () => window.clearInterval(interval);
  }, []);

  const ascii = useMemo(() => buildAsciiFrame(frame, columns, rows), [frame]);

  return (
    <pre className={`ascii-trace ${className}`} aria-hidden="true">
      {ascii}
    </pre>
  );
}
