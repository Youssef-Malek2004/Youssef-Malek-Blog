import React from "react";

const data = [0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 0.93, 0.97, 1.0];
const width = 320;
const height = 120;
const padding = 30;
const barWidth = (width - 2 * padding) / data.length - 6;
const max = 1.0;

const QValueChart = () => (
  <div style={{ margin: "2rem 0", textAlign: "center" }}>
    <svg width={width} height={height} style={{ background: "#f4f8fb", borderRadius: 12 }}>
      {data.map((d, i) => {
        const x = padding + i * ((width - 2 * padding) / data.length);
        const y = height - padding - (d / max) * (height - 2 * padding);
        const h = (d / max) * (height - 2 * padding);
        return <rect key={i} x={x} y={y} width={barWidth} height={h} fill="#00b894" rx={3} />;
      })}
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#bbb" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#bbb" />
      {/* Labels */}
      <text x={padding} y={height - 8} fontSize="0.9rem" fill="#888">
        0
      </text>
      <text x={padding} y={padding - 8} fontSize="0.9rem" fill="#888">
        Q-value
      </text>
      <text x={width - padding} y={height - 8} fontSize="0.9rem" fill="#888">
        Iterations
      </text>
    </svg>
    <div style={{ color: "#00b894", fontWeight: 500, marginTop: 8 }}>Q-values converge as learning progresses!</div>
  </div>
);

export default QValueChart;
