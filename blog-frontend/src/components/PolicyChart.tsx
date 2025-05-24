const data = [0.2, 0.25, 0.3, 0.4, 0.55, 0.7, 0.8, 0.88, 0.93, 0.97, 1.0];
const width = 320;
const height = 120;
const padding = 30;
const max = 1.0;
const points = data
  .map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d / max) * (height - 2 * padding);
    return `${x},${y}`;
  })
  .join(" ");
const areaPoints = `${padding},${height - padding} ` + points + ` ${width - padding},${height - padding}`;

const PolicyChart = () => (
  <div style={{ margin: "2rem 0", textAlign: "center" }}>
    <svg width={width} height={height} style={{ background: "#f4f8fb", borderRadius: 12 }}>
      <polygon fill="#ffeaa7" stroke="none" points={areaPoints} opacity={0.7} />
      <polyline fill="none" stroke="#fdcb6e" strokeWidth="3" points={points} />
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#bbb" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#bbb" />
      {/* Labels */}
      <text x={padding} y={height - 8} fontSize="0.9rem" fill="#888">
        0
      </text>
      <text x={padding} y={padding - 8} fontSize="0.9rem" fill="#888">
        Policy Score
      </text>
      <text x={width - padding} y={height - 8} fontSize="0.9rem" fill="#888">
        Episodes
      </text>
    </svg>
    <div style={{ color: "#fdcb6e", fontWeight: 500, marginTop: 8 }}>Policy improves with training!</div>
  </div>
);

export default PolicyChart;
